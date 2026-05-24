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
                throw new KeyNotFoundException($"Word with ID '{dto.WordId}' was not found.");
            }

            var nativeWord = word.NativeWord;

            var apiKey = _configuration["Gemini:ApiKey"];
            if (string.IsNullOrWhiteSpace(apiKey))
            {
                throw new InvalidOperationException("Gemini API Key is not configured. Please add 'Gemini:ApiKey' to your appsettings.json.");
            }

            var prompt = @$"
                You are an expert german language teacher.Your B1 level student would like you to help them understand the word {nativeWord}.
                To do this you will provide the following information and format your response in JSON.

                1-Provide the English translation of the word
                1- If the word is a Noun or a Verb
                2- If the word is a Noun then provide the gender of the word (der, die, das)
                3- Provde 1-3 synonyms
                4- Provide 1 usage of the word in the Present and 1 usage of the word in the Past tense
                5- Provide 1 usage of the word in the Passive form";

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

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, $"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent");
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
                .GetString();

            word.EnhanceResult = text;
            await _dataContext.SaveChangesAsync();

            return text ?? string.Empty;
        }
    }
}
