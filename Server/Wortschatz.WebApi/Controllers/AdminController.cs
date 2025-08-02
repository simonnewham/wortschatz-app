using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Wortschatz.Core.Static;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.WebApi.Controllers
{
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService adminService;

        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        [HttpGet("getCounts")]
        public async Task<AdminCountsDto> GetCounts()
        {
            return await adminService.GetAdminCountsAsync();
        }
    }
}
