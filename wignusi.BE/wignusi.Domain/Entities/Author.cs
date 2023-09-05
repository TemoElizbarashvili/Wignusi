using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class Author
    {
        public long AuthorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Nationality { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;


        // connections
        public ICollection<BookAuthor>? BooksLink { get; set; }
    }
}
