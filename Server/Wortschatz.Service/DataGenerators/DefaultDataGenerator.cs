using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Wortschatz.Core.Static;

namespace Wortschatz.Service.DataGenerators
{
    public class DefaultDataGenerator : IHostedService
    {
        private readonly IServiceProvider serviceProvider;

        public DefaultDataGenerator(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var roleManager = scope.ServiceProvider.GetService<RoleManager<IdentityRole>>() ?? throw new NullReferenceException();

                if (roleManager.Roles.Any())
                {
                    return;
                }

                foreach (var role in UserRoles.GetRoles())
                {
                    var identityRole = new IdentityRole()
                    {
                        Name = role
                    };

                    await roleManager.CreateAsync(identityRole);
                }
            }

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
