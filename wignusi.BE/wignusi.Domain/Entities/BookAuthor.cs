using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class BookAuthor
    {
        public Guid BookId { get; set; }
        public long AuthorId { get; set; }
        public byte Order { get; set; }

        // Relationships
        public Book Book { get; set; } = new Book();
        public Author Author { get; set; } = new Author();
    }
}
