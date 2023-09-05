using System.ComponentModel.DataAnnotations;

namespace wignusi.Domain.Dtos
{
    public record AuthorDto(
        [Required][MinLength(2)][MaxLength(35)] string Name,
        [Required] string Description,
        [Required][MinLength(2)][MaxLength(20)] string Nationality,
        [Required] string Image
        );
}
