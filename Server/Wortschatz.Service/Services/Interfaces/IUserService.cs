using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;

namespace Wortschatz.Service.Services.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Get the current user's id.
        /// </summary>
        /// <returns></returns>
        Guid GetUserId();

        /// <summary>
        /// get the current user's username.
        /// </summary>
        /// <returns></returns>
        string GetUserName();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userUpdateDto"></param>
        /// <returns></returns>
        Task<BaseUserDto> AddUserAsync(AddUserDto userUpdateDto);

        /// <summary>
        /// Update the current user.
        /// </summary>
        UpdateUserDto UpdateUser(UpdateUserDto userUpdateDto);

        /// <summary>
        /// Try get the current user.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        bool TryGetUser(out User user);

        /// <summary>
        /// Get summary stats for the current user.
        /// </summary>
        /// <returns></returns>
        Task<UserStatsSummaryDto> GetUserStatsSummaryAsync();
    }
}
