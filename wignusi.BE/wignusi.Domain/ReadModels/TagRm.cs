using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.ReadModels
{
    public record TagRm(
        [DefaultValue(null)]
        string Tag);
}
