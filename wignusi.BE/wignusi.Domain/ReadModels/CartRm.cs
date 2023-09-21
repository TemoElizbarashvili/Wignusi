using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.ReadModels
{
    public record CartRm(
        int CartId,
        int Quantity,
        Guid BookId,
        string BookImage,
        string BookTitle,
        decimal BookPrice
        );
}
