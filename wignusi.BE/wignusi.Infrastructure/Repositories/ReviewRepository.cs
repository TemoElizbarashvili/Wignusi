using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Domain.Repository_Contracts;

namespace wignusi.Infrastructure.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly WignusiDbContext _context;

        public ReviewRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public void CreateReview(Review review)
        {
            _context.Reviews.Add(review);
        }

        public void DeleteReview(long reviewId)
        {
            var reviewToDelete = _context.Reviews.FirstOrDefault(r => r.ReviewId == reviewId);
            if (reviewToDelete != null)
            {
                _context.Reviews.Remove(reviewToDelete); 
            }
        }

        public Review GetById(long reviewId)
        {
            var review = _context.Reviews.FirstOrDefault(r => r.ReviewId == reviewId);
            if (review != null) return review;
            else return null!;
        }

        public IQueryable<Review> GetReviews()
        {
            IQueryable<Review> reviews = _context.Reviews;
            return reviews;
        }

        public IQueryable<Review> GetReviewsByBookId(long bookId)
        {
            IQueryable<Review> reviews = _context.Reviews.Where(r => r.BookId == bookId);
            return reviews;
        }

    }
}
