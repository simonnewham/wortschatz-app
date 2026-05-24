using Wortschatz.Core.Static;

namespace Wortschatz.Service.Dtos
{
    public class WordAddDto
    {
        public required string NativeWord { get; set; }

        public required string TranslateWord { get; set; }

        public ArtikelType? Artikel { get; set; }

        public string? Usage { get; set; }

        public WordType? WordType { get; set; }
    }

    public class WordUpdateDto : WordAddDto
    {
        public Guid Id { get; set; }

        public string EnhanceResult { get; set; }
    }

    public class WordListDto : WordUpdateDto
    {
    }

    public class WordEnhanceDto
    {
        public required string Word { get; set; }

        public Guid WordId { get; set; }
    }
}
