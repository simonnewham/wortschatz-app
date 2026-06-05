using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        /// <summary>
        /// Registers a new user in the system.
        /// </summary>
        /// <param name="updateUserDto">The data transfer object containing the new user's email and password.</param>
        /// <returns>A base user data transfer object.</returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<BaseUserDto> Register([FromBody] AddUserDto updateUserDto)
        {
            var result = await userService.AddUserAsync(updateUserDto);

            return result;
        }


        /// <summary>
        /// Retrieves the profile information for the currently authenticated user.
        /// </summary>
        /// <returns>The user's information including their first and last name.</returns>
        [HttpGet("getUserInfo")]
        public UserInfoDto? GetUserDetails()
        {
           return userService.GetUserInfo();
        }


        /// <summary>
        /// Retrieves a statistical summary of the user's activity (e.g., word and phrase counts).
        /// </summary>
        /// <returns>A summary of the user's statistics.</returns>
        [HttpGet("getStatsSummary")]
        public async Task<UserStatsSummaryDto> GetUserStatsSummary()
        {
            return await userService.GetUserStatsSummaryAsync();
        }

        /// <summary>
        /// Retrieves the current streaks for the user's word and phrase creations.
        /// </summary>
        /// <returns>An object detailing the user's consecutive active days.</returns>
        [HttpGet("getStreaks")]
        [ResponseCache(Duration = 60)]
        public async Task<UserStreaksDto> GetUserStreaks()
        {
            return await userService.GetUserStreaksAsync();
        }
        /// <summary>
        /// Updates the profile settings for the currently authenticated user.
        /// </summary>
        /// <param name="updateUserDto">The updated user information.</param>
        /// <returns>The updated user data transfer object.</returns>
        [HttpPost("update")]
        public UpdateUserDto UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            return userService.UpdateUser(updateUserDto);
        }
    }
}
