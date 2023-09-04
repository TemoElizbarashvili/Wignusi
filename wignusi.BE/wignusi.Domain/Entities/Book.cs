using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class Book
    {
        public Guid BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } =string.Empty;
        public string? Publisher { get; set; } = string.Empty;
        public DateTime PublishedOn { get; set; }
        public decimal Price { get; set; }
        public bool IsAvialable { get; set; } = true;
        


        // Relationships

        public ICollection<BookAuthor>? AuthorsLink { get; set; } = new List<BookAuthor>(); 
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Tag>? Tags { get; set; } = new List<Tag>();
        public PriceOffer? Promotion { get; set; } = new();
    }
}
