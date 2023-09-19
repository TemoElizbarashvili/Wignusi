
namespace wignusi.Domain.ReadModels
{
    public record UserRm(
        int Id,
        string Username,
        string Email,
        string Phone,
        string PasswordHash,
        string Role
        );
}
