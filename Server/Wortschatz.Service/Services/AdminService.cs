using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services
{
    public class AdminService : IAdminService
    {
        private readonly DataContext context;

        public AdminService(DataContext context)
        {
            this.context = context;
        }

        public async Task<AdminCountsDto> GetAdminCountsAsync()
        {
            var wordCount = await context.Words.CountAsync();
            var phraseCount = await context.Phrases.CountAsync();
            var userCount = await context.Users.CountAsync();

            return new AdminCountsDto
            {
                WordCount = wordCount,
                PhraseCount = phraseCount,
                UserCount = userCount
            };
        }
    }
}
