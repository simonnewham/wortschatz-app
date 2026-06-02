using Microsoft.AspNetCore.Identity;

namespace Wortschatz.Core.Models;

public class User : IdentityUser
{
    public UserSetting? UserSetting { get; set; }
}