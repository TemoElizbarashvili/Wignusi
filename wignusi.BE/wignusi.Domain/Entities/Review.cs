using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class Review
    {
        public long ReviewId { get; set; }
        public string VoterName { get; set; } =string.Empty;
        public int RateStars { get; set; }
        public string Comment { get; set; } = string.Empty;

        // Relationships
        public int BookId { get; set; }
    }
}
