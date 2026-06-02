using System.ComponentModel.DataAnnotations.Schema;

namespace Wortschatz.Core.Models
{
    public class UserSetting: BaseEntity
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public required string UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }

    }
}
