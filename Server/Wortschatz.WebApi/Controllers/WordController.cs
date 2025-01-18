using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class WordController : ControllerBase
{
    public WordController(DataContext dataContext,
        ILogger<Word> logger)
    {
        this.dataContext = dataContext;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IEnumerable<Word>> GetWords()
    {
        var words = await dataContext.Words.ToListAsync();
        return words;
    }

    [HttpGet("{id}")]
    public async Task<Word> GetWord(string id)
    {
        var word = await dataContext.Words.FirstAsync(t => t.Id == Guid.Parse(id));
        return word;
    }

    [HttpDelete("{id}")]
    public async Task<Word> DeleteWord(string id)
    {
        var word = await dataContext.Words.FirstAsync(t => t.Id == Guid.Parse(id));
        dataContext.Remove(word);

        return word;
    }

    [HttpPost]
    public async Task<Word> AddWord([FromBody] Word wordDto)
    {
        var word = await dataContext.Words.AddAsync(wordDto);
        return word.Entity;
    }

    private readonly DataContext dataContext;
    private readonly ILogger<Word> _logger;
}
