using System.ComponentModel.DataAnnotations.Schema;


namespace wignusi.Domain.Entities
{
    public class ShoppingCart
    {
        public ShoppingCart() => Quantity = 1;
        public int ShoppingCartId { get; set; }
        public int Quantity { get; set; }
        public Guid BookId { get; set; }
        public int UserId { get; set; }

        // Relationships
        [ForeignKey("BookId")]
        public Book? Book { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
