using System.Text.Json.Serialization;

namespace Wortschatz.Core.Static
{
    [JsonConverter(typeof(JsonStringEnumConverter<ArtikelType>))]
    public enum ArtikelType
    {
        Der = 0,
        Die = 1,
        Das = 3
    }
}
