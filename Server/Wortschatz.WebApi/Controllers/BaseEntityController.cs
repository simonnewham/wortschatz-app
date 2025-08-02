using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Wortschatz.Core.Models;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers
{
    public abstract class BaseEntityController<T, TAdd, TUpdate, TDetail, TList> : ControllerBase where T : BaseEntity
    {
        public BaseEntityController(IBaseEntityService<T, TAdd, TUpdate, TDetail, TList> baseEntityService)
        {
            this.baseEntityService = baseEntityService;
        }

        [HttpGet]
        public async Task<T> Get(Guid Id)
        {
            var entity = await baseEntityService.GetByIdAsync(Id);
            return entity;
        }

        [HttpDelete]
        public async Task<bool> Delete(Guid id)
        {
            return await baseEntityService.DeleteAsync(id);
        }

        [HttpPost("Create")]
        public async Task<TUpdate> Create([FromBody] TAdd addDto)
        {
            return await baseEntityService.AddAsync(addDto);
        }

        [HttpPost("Update")]
        public async Task<TUpdate> Update([FromBody] TUpdate updateDto)
        {
            return await baseEntityService.UpdateAsync(updateDto);
        }


        [HttpPost("GetList")]
        [EnableQuery]
        public async Task<IEnumerable<T>> GetList()
        {
            return await baseEntityService.GetAllAsync();
        }

        private readonly IBaseEntityService<T, TAdd, TUpdate, TDetail, TList> baseEntityService;
    }
}
