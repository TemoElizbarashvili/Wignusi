using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace wignusi.Domain.Dtos
{
    public record OrderDto(
        [Required] string Name,
        string Details,
        [Required][DefaultValue("Panding")] string Status,
        [Required] int UserId,
        [Required] decimal OrderTotal,
        [Required] int[] LineIds
        );
}
