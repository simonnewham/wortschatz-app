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
    public WordController(IBaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto> baseEntityService) : base(baseEntityService)
    {
    }
}
