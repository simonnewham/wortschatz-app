
namespace Wortschatz.Core.Models;

public class WordTag : BaseEntity
{
    public required Word Word { get; set; }

    public required Tag Tag { get; set; }
}