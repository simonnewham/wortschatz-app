using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly DataContext context;

        public UserService(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.context = context;
        }

        public Guid GetUserId()
        {
            var user = GetClaimsPrincipal();

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            return Guid.Parse(userId!);
        }

        public string GetUserName()
        {
            var user = GetClaimsPrincipal();

            var userName = user.FindFirstValue(ClaimTypes.Name);

            return userName!;
        }

        public UpdateUserDto UpdateUser(UpdateUserDto userUpdateDto)
        {
            if (TryGetUser(out var user))
            {
                user.FirstName = userUpdateDto.FirstName;
                user.LastName = userUpdateDto.LastName;

                context.SaveChanges();

                return userUpdateDto;
            }

            throw new Exception("User not found");
        }

        public bool TryGetUser(out User user)
        {
            var userId = GetUserId().ToString();

            user = context.Users.Find(userId)!;

            return user != null;
        }

        private ClaimsPrincipal GetClaimsPrincipal()
        {
            var user = httpContextAccessor.HttpContext?.User;

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return user;
        }

        public async Task<UserStatsSummaryDto> GetUserStatsSummaryAsync()
        {
            var userId = GetUserId();

            var words = context.Words.Where(t => t.CreatedByUserId == userId);
            var phrases = context.Phrases.Where(t => t.CreatedByUserId == userId);

            return new UserStatsSummaryDto
            {
                WordCount = await words.CountAsync(),
                PhraseCount = await phrases.CountAsync(),
            };
        }
    }
}
