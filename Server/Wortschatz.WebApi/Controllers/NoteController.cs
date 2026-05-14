using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class NoteController : BaseEntityController<Note, NoteAddDto, NoteUpdateDto, NoteDetailDto, NoteListDto>
{
    public NoteController(IBaseEntityService<Note, NoteAddDto, NoteUpdateDto, NoteDetailDto, NoteListDto> baseEntityService) : base(baseEntityService)
    {
    }
}
