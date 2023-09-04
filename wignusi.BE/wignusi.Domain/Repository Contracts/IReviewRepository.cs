using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IReviewRepository
    {
        public IQueryable<Review> GetReviews();
        public Task<IQueryable<Review>> GetReviewsByBookIdAsync(long bookId);
        public IQueryable<Review> GetReviewsByBookId(long bookId);
        public void CreateReview(Review review);
        public void DeleteReview(long reviewId);
    }
}
