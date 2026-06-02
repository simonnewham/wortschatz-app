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
        /// 
        /// </summary>
        /// <param name="updateUserDto"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<BaseUserDto> Register([FromBody] AddUserDto updateUserDto)
        {
            var result = await userService.AddUserAsync(updateUserDto);

            return result;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getUserInfo")]
        public UserInfoDto? GetUserDetails()
        {
            var username = userService.GetUserName();

            if (!string.IsNullOrEmpty(username) && userService.TryGetUser(out var user))
            {
                return new UserInfoDto
                {
                    UserName = username
                };
            }

           return null;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getStatsSummary")]
        public async Task<UserStatsSummaryDto> GetUserStatsSummary()
        {
            return await userService.GetUserStatsSummaryAsync();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet("getStreaks")]
        [ResponseCache(Duration = 60)]
        public async Task<UserStreaksDto> GetUserStreaks()
        {
            return await userService.GetUserStreaksAsync();
        }
    }
}
