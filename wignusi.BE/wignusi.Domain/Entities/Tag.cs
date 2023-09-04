using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace wignusi.Domain.Entities
{
    public class Tag
    {
        [Key]
        [Required]
        [MaxLength(40)]
        public string? TagId { get; set; }

        // relations
        public ICollection<Book>? Books { get; set; }
    }
}
