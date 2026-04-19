namespace Wortschatz.Core.Models;

public class Phrase : BaseEntity
{
    public required string NativePhrase { get; set; }

    public string? TranslatePhrase{ get; set; }

    public string? Usage { get; set; }
}