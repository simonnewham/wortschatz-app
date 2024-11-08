namespace Wortschatz.Core.Models;

public class Word : BaseEntity
{
    public required string NativeWord { get; set; }

    public string? NativeWordGender { get; set; }

    public required string TranslateWord { get; set; }

    public string? TranslateWordGender { get; set; }

    public IEnumerable<string>? Tags { get; set; }

    public string? Usage { get; set; }

    public required User User { get; set; }
}