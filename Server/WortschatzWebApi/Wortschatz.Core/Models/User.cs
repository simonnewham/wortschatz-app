namespace Wortschatz.Core.Models;

public class User : BaseEntity
{
    public required string Username { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }
}