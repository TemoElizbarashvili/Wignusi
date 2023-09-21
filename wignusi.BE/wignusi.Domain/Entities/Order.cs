using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class Order
    {
        public int OrderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Details { get; set; }
        public string Status { get; set; } = string.Empty;
        public int UserId { get; set; }
        public decimal OrderTotal { get; set; }

        // Relations
        public ICollection<ShoppingCart>? CartLines { get; set; }
    }
}
