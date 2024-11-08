using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Wortschatz.Core.DataLayer;

public static class DataLayerExtensions
{
    public static IServiceCollection AddDataContext(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        return services;
    }
}