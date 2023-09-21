using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.ReadModels
{
    public record LoginRm(
        string Token,
        string Role,
        int Id
        );
}
