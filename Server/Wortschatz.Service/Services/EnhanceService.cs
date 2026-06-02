using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Wortschatz.Core.DataLayer;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services
{
    public class EnhanceService : IEnhanceService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly DataContext _dataContext;

        public EnhanceService(HttpClient httpClient, IConfiguration configuration, DataContext dataContext)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _dataContext = dataContext;
        }

        public async Task<string> EnhanceWordAsync(WordEnhanceDto dto)
        {
            var word = await _dataContext.Words.FirstOrDefaultAsync(w => w.Id == dto.WordId);
            if (word == null)
            {
                throw new KeyNotFoundException($"Word was not found.");
            }

            var nativeWord = word.NativeWord;

            // TODO: Config model
            var apiKey = _configuration["Gemini:ApiKey"];
            var endpoint = _configuration["Gemini:Endpoint"];

            if (string.IsNullOrWhiteSpace(apiKey))
            {
                throw new InvalidOperationException("Not Key found");
            }

            var prompt = @$"
                You are an expert german language teacher.Your **B1** level student would like you to help them understand the word **{nativeWord}**.
                To do this you will provide the following information and format your response in **JSON**.

                1- Provide the word itself
                2- If the word is misspelled, provide possible word options, if not then provide an empty array
                3- If the word is a Noun or a Verb
                4- If the wordType is a Noun then provide the gender of the word (der, die, das) else provide an empty string
                5- If the wordType is a Verb then provide the Perfekt and Pratertium past tense
                6- Provide a short and simple explanation of the word in German. Not more than 2 sentences.
                7- Provide the English translation of the word
                8- Provide 1-3 synonyms, if nouns then with the correct gender
                9- Provide 1 usage of the word in Present, Perfekt Past and Passive form
                10- Provide a single category to group similar words
                11- If possible provide the Swiss-German equivalent word, if a noun then with the correct gender equivalent
                
                Use the following JSON structure to ensure a consistent output:
                {{
                    ""word"": ""string"",
                    ""corrections"": ""string[]"",
                    ""wordType"": ""string"",
                    ""noun"": {{
                        ""gender"": ""string""
                    }}
                    ""verb"": {{
                        ""perfekt"": ""string"",
                         ""pratertium"": ""string""
                    }},
                    ""explanation"": ""string"",
                    ""translation"": ""string"",
                    ""synonyms"": ""string[]"",
                    ""usages"": {{
                        ""present"": ""string"",
                        ""past"": ""string"",
                        ""passive"": ""string""
                    }},
                    ""category"": ""string"",
                    ""swiss_german"": ""string""
                }}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            var jsonPayload = JsonSerializer.Serialize(requestBody);

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, endpoint);
            requestMessage.Headers.Add("x-goog-api-key", apiKey);
            requestMessage.Content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(requestMessage);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Gemini API call failed with status code {response.StatusCode}: {errorContent}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(jsonResponse);

            var text = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString() ?? string.Empty;

            word.EnhanceResult = text;
            await _dataContext.SaveChangesAsync();

            return text;
        }
    }
}
