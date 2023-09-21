using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Dtos
{
    public record CartDto(
        [Required][Range(1,100,ErrorMessage =("Please select in range 1-100"))] int Quantity,
        [Required] Guid BookId,
        [Required] int UserId
    );
}
