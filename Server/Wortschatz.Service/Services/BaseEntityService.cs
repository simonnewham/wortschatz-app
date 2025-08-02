using Mapster;
using Microsoft.EntityFrameworkCore;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Services;

public class BaseEntityService<T, TAdd, TUpdate, TDetail, TList> : IBaseEntityService<T, TAdd, TUpdate, TDetail, TList> where T : BaseEntity
{
    public BaseEntityService(DataContext context, IUserService userService)
    {
        _dataContext = context ?? throw new ArgumentNullException(nameof(context));
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));

        _dbSet = _dataContext.Set<T>();
    }

    public async Task<T> GetByIdAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity));
        }

        var userId = _userService.GetUserId();
        if (entity.CreatedByUserId != userId)
        {
            throw new UnauthorizedAccessException();
        }

        return entity;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var userId = _userService.GetUserId();

        return await _dbSet.Where(t => t.CreatedByUserId == null || t.CreatedByUserId == userId)
            .ToListAsync();
    }

    public async Task<TUpdate> AddAsync(TAdd addDto, bool setUserId = true)
    {
        if (addDto == null)
        {
            throw new ArgumentNullException(nameof(addDto));
        }

        var entity = addDto.Adapt<T>();

        if (setUserId)
        {
            entity.CreatedByUserId = _userService.GetUserId();
        }

        var result = await _dbSet.AddAsync(entity);
        await _dataContext.SaveChangesAsync();


        return result.Entity.Adapt<TUpdate>();
    }

    public async Task<TUpdate> UpdateAsync(TUpdate updateDto)
    {
        if (updateDto == null)
        {
            throw new ArgumentNullException(nameof(updateDto));
        }

        var entity = updateDto.Adapt<T>();

        var result = _dbSet.Update(entity);
        await _dataContext.SaveChangesAsync();

        return result.Entity.Adapt<TUpdate>();

    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _dbSet.FindAsync(id);

        if (entity == null)
        {
            return false;
        }

        var userId = _userService.GetUserId();
        if (entity.CreatedByUserId != userId)
        {
            throw new UnauthorizedAccessException();
        }

        _dbSet.Remove(entity);
        await _dataContext.SaveChangesAsync();

        return true;

    }

    private readonly DataContext _dataContext;
    private readonly IUserService _userService;
    private readonly DbSet<T> _dbSet;
}