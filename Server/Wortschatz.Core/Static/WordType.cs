using System.Text.Json.Serialization;

namespace Wortschatz.Core.Static
{
    [JsonConverter(typeof(JsonStringEnumConverter<WordType>))]
    public enum WordType
    {
        Noun = 0,
        Verb = 1,
        Adjective = 2,
        Adverb = 3
    }
}