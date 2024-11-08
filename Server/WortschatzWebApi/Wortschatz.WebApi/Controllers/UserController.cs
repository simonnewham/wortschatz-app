using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Models;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    public UserController(BaseEntityService<User> userService,
        ILogger<Word> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<User>> AddUser()
    {
        var user = await _userService.AddAsync(new User()
        {
            Username = "simon"
        });

        return Ok(user);
    }

    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    // {
    //     var users = await _userService.Users.ToListAsync();
    //     return users;
    // }

    private readonly BaseEntityService<User> _userService;
    private readonly ILogger<Word> _logger;
}
