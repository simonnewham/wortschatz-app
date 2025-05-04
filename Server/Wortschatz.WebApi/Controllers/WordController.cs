using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;

namespace Wortschatz.WebApi.Controllers;

[ApiController]
//[Authorize]
[Route("[controller]")]
public class WordController : ControllerBase
{
    public WordController(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }

    [HttpGet]
    [EnableQuery]
    public async Task<IEnumerable<Word>> Get()
    {
        var words = await dataContext.Words.ToListAsync();
        return words;
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
        var entity = await dataContext.Words.AddAsync(wordDto);

        var word = entity.Entity;

        dataContext.SaveChanges();

        return word;
    }

    private readonly DataContext dataContext;
}
