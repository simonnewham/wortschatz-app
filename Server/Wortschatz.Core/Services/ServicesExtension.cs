using Microsoft.Extensions.DependencyInjection;

namespace Wortschatz.Core.DataLayer;

public static class ServicesExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped(typeof(BaseEntityService<>));

        return services;
    }
}