using Microsoft.Extensions.DependencyInjection;
using Wortschatz.Core.Models;
using Wortschatz.Service.Dtos;
using Wortschatz.Service.Services;
using Wortschatz.Service.Services.Interfaces;

namespace Wortschatz.Service.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddWortschatzServices(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();

            // Generics
            services.AddScoped<IBaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto>,
                BaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto>>();
            services.AddScoped<IBaseEntityService<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto>,
               BaseEntityService<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto>>();

            return services;
        }
    }
}
