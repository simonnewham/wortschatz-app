using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
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

        private ClaimsPrincipal GetClaimsPrincipal()
        {
            var user = httpContextAccessor.HttpContext?.User;

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            return user;
        }
    }
}
