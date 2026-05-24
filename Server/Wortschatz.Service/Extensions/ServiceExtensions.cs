using Microsoft.Extensions.DependencyInjection;
using Wortschatz.Core.Models;
using Wortschatz.Service.DataGenerators;
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
            services.AddScoped<IEnhanceService, EnhanceService>();
            services.AddHostedService<DefaultDataGenerator>();

            // Generics
            services.AddScoped<IBaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto>,
                BaseEntityService<Word, WordAddDto, WordUpdateDto, WordUpdateDto, WordListDto>>();
            services.AddScoped<IBaseEntityService<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto>,
               BaseEntityService<Phrase, PhraseAddDto, PhraseUpdateDto, PhraseDetailDto, PhraseListDto>>();
            services.AddScoped<IBaseEntityService<Note, NoteAddDto, NoteUpdateDto, NoteDetailDto, NoteListDto>,
               BaseEntityService<Note, NoteAddDto, NoteUpdateDto, NoteDetailDto, NoteListDto>>();

            return services;
        }
    }
}
