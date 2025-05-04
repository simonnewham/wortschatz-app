using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.Models;

namespace Wortschatz.Core.DataLayer;

public class DataContext : IdentityDbContext<User>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<Tag> Tags { get; set; }
    public DbSet<Word> Words { get; set; }
    public DbSet<WordTag> WordTags { get; set; }
}