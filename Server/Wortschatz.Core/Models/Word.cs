using Wortschatz.Core.Static;

namespace Wortschatz.Core.Models;

public class Word : BaseEntity
{
    public required string NativeWord { get; set; }

    public ArtikelType? Artikel { get; set; }

    public required string TranslateWord { get; set; }

    public string? Usage { get; set; }

    public WordType? WordType { get; set; }

    public IEnumerable<WordTag>? Tags { get; set; }

    public string? EnhanceResult { get; set; }
}