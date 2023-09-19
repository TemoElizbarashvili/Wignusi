using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


namespace wignusi.Domain.Dtos
{
    public record UserDto(
        [Required][StringLength(20, MinimumLength = 2)] string Username,
        [Required][EmailAddress][StringLength(35, MinimumLength = 3)] string EmailAddress,
        [Required][Phone] string Phone,
        [Required] string Password,
        [Required][DefaultValue("Customer")] string Role
        );
}
