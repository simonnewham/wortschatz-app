namespace Wortschatz.Core.Models;

public class Note : BaseEntity
{
    public required string Title { get; set; }

    public string? Description { get; set; }

    public string? Notes { get; set; }
}
