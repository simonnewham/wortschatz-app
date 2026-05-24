using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class WordController : BaseEntityController<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto>
{
    private readonly IEnhanceService _enhanceService;

    public WordController(
        IBaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto> baseEntityService,
        IEnhanceService enhanceService) : base(baseEntityService)
    {
        _enhanceService = enhanceService;
    }

    [HttpPost("enhance")]
    public async Task<IActionResult> Enhance([FromBody] WordEnhanceDto dto)
    {
        var result = await _enhanceService.EnhanceWordAsync(dto);
        return Ok(new { result });
    }
}
