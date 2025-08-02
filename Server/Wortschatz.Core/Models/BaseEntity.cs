namespace Wortschatz.Core.Models;

public abstract class BaseEntity
{
    public required Guid Id { get; set; }
    
    public Guid? CreatedByUserId { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now;
}