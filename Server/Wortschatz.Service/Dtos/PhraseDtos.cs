namespace Wortschatz.Service.Dtos
{
    public class PhraseAddDto
    {
        public required string NativePhrase { get; set; }

        public string? TranslatePhrase { get; set; }

        public string? Usage { get; set; }
    }

    public class PhraseUpdateDto : PhraseAddDto
    {
        public Guid Id { get; set; }
    }

    public class PhraseDetailDto : PhraseUpdateDto
    {
    }

    public class PhraseListDto : PhraseUpdateDto
    {
    }
}
