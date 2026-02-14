using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Wortschatz.Core.DataLayer;
using Wortschatz.Core.Models;
using Wortschatz.Service.Extensions;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers().AddOData(options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null));

        // Services
        builder.Services.AddWortschatzServices();

        // Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });
        });

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:8081").AllowAnyHeader().AllowAnyMethod();
                });
        });

        // DB
        builder.Services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnectionString"));
        });

        // Auth
        builder.Services.AddAuthorization()
            .AddIdentityApiEndpoints<User>()
            .AddRoles<IdentityRole>()
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
        app.UseCors();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}