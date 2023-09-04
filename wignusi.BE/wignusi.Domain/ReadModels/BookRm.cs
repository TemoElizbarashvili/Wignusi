using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;

namespace wignusi.Domain.ReadModels
{
    public record BookRm(
        Guid Id,
        string Title,
        string Description,
        string Publisher, 
        DateTime PublishedOn,
        decimal Price,
        bool IsAvialable,
        decimal ActualPrice,
        string PromotionalText,
        string[] AuthorsOrdered,
        string[] Tags,
        int ReviewsCount,
        string Image
        );

}
