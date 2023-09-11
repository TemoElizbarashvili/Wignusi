using System.ComponentModel.DataAnnotations;


namespace wignusi.Domain.Dtos
{
    public record UserDto(
        [Required] string Username,
        [Required] string Password
        );
}
