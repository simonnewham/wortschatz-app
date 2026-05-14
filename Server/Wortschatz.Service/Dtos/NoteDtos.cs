namespace Wortschatz.Service.Dtos
{
    public class NoteAddDto
    {
        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? Notes { get; set; }
    }

    public class NoteUpdateDto : NoteAddDto
    {
        public Guid Id { get; set; }
    }

    public class NoteDetailDto : NoteUpdateDto
    {
       public DateTime CreatedDate { get; set; }
    }

    public class NoteListDto : NoteUpdateDto
    {
    }
}
