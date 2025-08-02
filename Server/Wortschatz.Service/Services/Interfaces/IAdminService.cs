using Wortschatz.Service.Dtos;

namespace Wortschatz.Service.Services.Interfaces
{
    public interface IAdminService
    {
        Task<AdminCountsDto> GetAdminCountsAsync();
    }
}
