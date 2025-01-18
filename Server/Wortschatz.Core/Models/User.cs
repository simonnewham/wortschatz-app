using Microsoft.AspNetCore.Identity;

namespace Wortschatz.Core.Models;

public class User : IdentityUser
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }
}