using System.ComponentModel.DataAnnotations;

namespace wignusi.Domain.Dtos
{
    public record BookDto(
        [Required] string Title,
        [Required] string Description,
        [Required] string Image,
        string Publisher,
        DateTime Published,
        [Required] decimal Price,
        [Required] bool IsAvialable,
        AuthorDto[]? authors,
        long[]? authorsIds,
        [Required] string[] tags
        );
}
