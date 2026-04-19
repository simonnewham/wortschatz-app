using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;
using Wortschatz.Core.Static;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services
{
    public class UserService : IUserService
    {
        public UserService(
            IHttpContextAccessor httpContextAccessor,
            UserManager<User> userManager,
            DataContext context)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
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

        public async Task<UpdateUserDto> AddUserAsync(AddUserDto addUserDto)
        {
            var user = new User()
            {
                UserName = addUserDto.Email,
                FirstName = addUserDto.FirstName,
                LastName = addUserDto.LastName
            };

            var result = await userManager.CreateAsync(user, addUserDto.Password);
            await userManager.AddToRoleAsync(user, UserRoles.User);

            if (result.Succeeded)
            {
                // TODO: Email and logging 

                return new UpdateUserDto
                {
                    FirstName = addUserDto.FirstName,
                    LastName = addUserDto.LastName
                };
            }
            else
            {
                throw new Exception("Registration failed");
            }

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
                LastWord = words.OrderByDescending(t => t.CreatedDate).FirstOrDefault()?.NativeWord,
                LastPhrase = phrases.OrderByDescending(t => t.CreatedDate).FirstOrDefault()?.NativePhrase,
            };
        }

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<User> userManager;
        private readonly DataContext context;
    }
}
