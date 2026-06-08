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

        public async Task<BaseUserDto> AddUserAsync(AddUserDto addUserDto)
        {
            var user = new User()
            {
                UserName = addUserDto.Email
            };

            var result = await userManager.CreateAsync(user, addUserDto.Password);
            await userManager.AddToRoleAsync(user, UserRoles.User);

            if (result.Succeeded)
            {
                // TODO: Email and logging 

                return new BaseUserDto();
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
                var userSetting = context.UserSettings.FirstOrDefault(u => u.UserId == user.Id);
                if (userSetting == null)
                {
                    userSetting = new UserSetting
                    {
                        Id = Guid.NewGuid(),
                        UserId = user.Id,
                        FirstName = userUpdateDto.FirstName,
                        LastName = userUpdateDto.LastName
                    };
                    context.UserSettings.Add(userSetting);
                }
                else
                {
                    userSetting.FirstName = userUpdateDto.FirstName;
                    userSetting.LastName = userUpdateDto.LastName;
                }

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

        public UserInfoDto? GetUserInfo()
        {
            var username = GetUserName();
            if (!string.IsNullOrEmpty(username) && TryGetUser(out var user))
            {
                var userInfo = new UserInfoDto
                {
                    UserName = username
                };

                var userSetting = context.UserSettings.FirstOrDefault(u => u.UserId == user.Id);
                if (userSetting != null)
                {
                    userInfo.FirstName = userSetting.FirstName;
                    userInfo.LastName = userSetting.LastName;
                }

                return userInfo;
            }

            return null;
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

        public async Task<UserStreaksDto> GetUserStreaksAsync()
        {
            var userId = GetUserId();

            var wordDates = await context.Words
                .Where(t => t.CreatedByUserId == userId)
                .Select(t => t.CreatedDate)
                .ToListAsync();

            var distinctWordDates = wordDates.Select(d => d.Date).Distinct().OrderByDescending(d => d).ToList();

            var phraseDates = await context.Phrases
                .Where(t => t.CreatedByUserId == userId)
                .Select(t => t.CreatedDate)
                .ToListAsync();
            
            var distinctPhraseDates = phraseDates.Select(d => d.Date).Distinct().OrderByDescending(d => d).ToList();

            return new UserStreaksDto
            {
                WordStreak = CalculateStreak(distinctWordDates),
                PhraseStreak = CalculateStreak(distinctPhraseDates)
            };
        }

        private int CalculateStreak(List<DateTime> dates)
        {
            if (!dates.Any()) return 0;

            var today = DateTime.UtcNow.Date;
            var current = dates[0];
            
            // Streak must be active either today or yesterday
            if (current != today && current != today.AddDays(-1))
            {
                return 0;
            }

            int streak = 1;
            for (int i = 1; i < dates.Count; i++)
            {
                if (dates[i] == current.AddDays(-1))
                {
                    streak++;
                    current = dates[i];
                }
                else
                {
                    break;
                }
            }

            return streak;
        }

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<User> userManager;
        private readonly DataContext context;
    }
}
