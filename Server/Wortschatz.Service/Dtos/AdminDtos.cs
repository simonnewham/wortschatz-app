namespace Wortschatz.Service.Dtos
{
    public record AdminCountsDto
    {
        public int WordCount { get; set; }

        public int PhraseCount { get; set; }

        public int UserCount { get; set; }
    }
}
