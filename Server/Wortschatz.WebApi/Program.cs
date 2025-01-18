using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();

        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // DB
        builder.Services.AddDataContext(
            builder.Configuration.GetConnectionString("DefaultConnectionString"));

        // Auth
        builder.Services.AddAuthorization()
            .AddIdentityApiEndpoints<User>()
            .AddEntityFrameworkStores<DataContext>();

        builder.Services.AddAuthentication();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.MapIdentityApi<User>();

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}