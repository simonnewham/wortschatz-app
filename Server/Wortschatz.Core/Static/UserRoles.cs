namespace Wortschatz.Core.Static
{
    public static class UserRoles
    {
        public const string Admin = "admin";
        public const string User = "user";
        public const string Teacher = "teacher";

        public static IList<string> GetRoles()
        {
            return [Admin, User, Teacher];
        }
    }
}
