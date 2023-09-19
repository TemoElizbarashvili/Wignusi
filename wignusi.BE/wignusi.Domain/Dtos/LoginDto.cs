using System.ComponentModel.DataAnnotations;

namespace wignusi.Domain.Dtos
{
    public record LoginDto(
        [Required][EmailAddress] string Email,
        [Required] string Password
        );
}
