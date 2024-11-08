namespace Wortschatz.Core.Models;

public abstract class BaseEntity
{
    public Guid Id { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now;
}