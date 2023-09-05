using wignusi.Domain.Entities;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IReviewRepository
    {
        public IQueryable<Review> GetReviews();
        public Review GetById(long reviewId);
        public IQueryable<Review> GetReviewsByBookId(long bookId);
        public void CreateReview(Review review);
        public void DeleteReview(long reviewId);
    }
}
