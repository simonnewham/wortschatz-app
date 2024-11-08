using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Models;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WordController : ControllerBase
{
    public WordController(
        ILogger<Word> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IEnumerable<Word> GetWords()
    {
        return new List<Word>();
    }

    private readonly ILogger<Word> _logger;
}
