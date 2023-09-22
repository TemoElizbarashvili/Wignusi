using System.ComponentModel.DataAnnotations.Schema;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Entities
{

    public class Order
    {
        public int OrderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Details { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int UserId { get; set; }
        public decimal OrderTotal { get; set; }
        public List<ShoppingCart>? Items { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
