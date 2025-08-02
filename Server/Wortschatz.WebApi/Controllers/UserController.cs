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
        /// <returns></returns>
        [HttpGet("getUserInfo")]
        public UserInfoDto? GetUserDetails()
        {
            var username = userService.GetUserName();

            if (!string.IsNullOrEmpty(username) && userService.TryGetUser(out var user))
            {
                return new UserInfoDto
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    UserName = username
                };
            }

           return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="updateUserDto"></param>
        /// <returns></returns>
        [HttpPost("update")]
        public UpdateUserDto UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            return userService.UpdateUser(updateUserDto);
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
    }
}
