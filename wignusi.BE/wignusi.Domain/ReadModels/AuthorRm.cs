using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.ReadModels
{
    public record AuthorRm(
        long Id,
        string Name,
        string Description,
        string Nationality,
        string Image,
        Guid[] BookIds
        );
}
