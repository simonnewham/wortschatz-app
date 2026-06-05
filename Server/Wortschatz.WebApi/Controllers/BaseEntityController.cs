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

        /// <summary>
        /// Retrieves a specific entity by its unique identifier.
        /// </summary>
        /// <param name="Id">The unique identifier of the entity.</param>
        /// <returns>The requested entity detail.</returns>
        [HttpGet("{id:guid}")]
        public async Task<T> Get([FromRoute] Guid Id)
        {
            var entity = await baseEntityService.GetByIdAsync(Id);
            return entity;
        }

        /// <summary>
        /// Deletes a specific entity by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the entity to delete.</param>
        /// <returns>A boolean indicating success or failure.</returns>
        [HttpDelete("{id:guid}")]
        public async Task<bool> Delete([FromRoute]Guid id)
        {
            return await baseEntityService.DeleteAsync(id);
        }

        /// <summary>
        /// Creates a new entity.
        /// </summary>
        /// <param name="addDto">The data transfer object containing the new entity's details.</param>
        /// <returns>The created entity.</returns>
        [HttpPost("create")]
        public async Task<TUpdate> Create([FromBody] TAdd addDto)
        {
            return await baseEntityService.AddAsync(addDto);
        }

        /// <summary>
        /// Updates an existing entity.
        /// </summary>
        /// <param name="updateDto">The data transfer object containing the updated entity's details.</param>
        /// <returns>The updated entity.</returns>
        [HttpPost("update")]
        public async Task<TUpdate> Update([FromBody] TUpdate updateDto)
        {
            return await baseEntityService.UpdateAsync(updateDto);
        }


        /// <summary>
        /// Retrieves a list of all entities. Supports OData querying.
        /// </summary>
        /// <returns>An enumerable collection of entities.</returns>
        [HttpPost("getList")]
        [EnableQuery]
        public async Task<IEnumerable<T>> GetList()
        {
            return await baseEntityService.GetAllAsync();
        }

        private readonly IBaseEntityService<T, TAdd, TUpdate, TDetail, TList> baseEntityService;
    }
}
