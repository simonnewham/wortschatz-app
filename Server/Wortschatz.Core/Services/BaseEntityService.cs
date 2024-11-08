using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;

public class BaseEntityService<T> where T : BaseEntity
{
    public BaseEntityService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<T> AddAsync(T obj)
    {
        var entity = await _dataContext.AddAsync<T>(obj);
        _dataContext.SaveChanges();
        
        return entity.Entity;
    }

    public DataContext _dataContext { get; }
}