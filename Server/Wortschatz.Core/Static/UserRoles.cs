using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Wortschatz.Core.Static
{
    public static class UserRoles
    {
        public const string Admin = "admin";
        public const string User = "user";

        public static IList<string> GetRoles()
        {
            return [Admin, User];
        }
    }
}
