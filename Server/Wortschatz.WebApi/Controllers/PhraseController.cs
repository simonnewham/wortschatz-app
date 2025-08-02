using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PhraseController : BaseEntityController<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto>
{
    public PhraseController(IBaseEntityService<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto> baseEntityService) : base(baseEntityService)
    {
    }
}
