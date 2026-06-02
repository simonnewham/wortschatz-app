using System.ComponentModel.DataAnnotations;

namespace Wortschatz.Service.Dtos
{
    public class BaseUserDto
    {
        public string Email { get; set; } = string.Empty;

        public string? FirstName { get; set; } = string.Empty;

        public string? LastName { get; set; } = string.Empty;
    }

    public class AddUserDto : BaseUserDto
    {
  
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class UpdateUserDto : BaseUserDto
    {
        public Guid Id { get; set; }
    }

    public class UserInfoDto : UpdateUserDto
    {
        public string UserName { get; set; } = string.Empty;
    }

    public class UserStatsSummaryDto
    {
        public string? LastWord { get; set; } = string.Empty;

        public int? WordCount { get; set; } = 0;

        public string? LastPhrase { get; set; } = string.Empty;

        public int? PhraseCount { get; set; } = 0;
    }
}
