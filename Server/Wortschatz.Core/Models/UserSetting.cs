namespace Wortschatz.Core.Models
{
    public class UserSetting: BaseEntity
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? UserId { get; set; }
    }
}
