using Wortschatz.Service.Dtos;

namespace Wortschatz.Service.Services.Interfaces
{
    public interface IEnhanceService
    {
        Task<string> EnhanceWordAsync(WordEnhanceDto dto);
    }
}
