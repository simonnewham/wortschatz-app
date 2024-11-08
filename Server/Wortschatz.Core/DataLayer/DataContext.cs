using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.Models;

namespace Wortschatz.Core.DataLayer;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {

    }

    public DbSet<User> Users { get; set; }
    public DbSet<Word> Words { get; set; }
}