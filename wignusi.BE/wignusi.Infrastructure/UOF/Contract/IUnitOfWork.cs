using wignusi.Domain.Repository_Contracts;

namespace wignusi.Infrastructure.UOF.Contract
{
    public interface IUnitOfWork
    {
        public void SaveChanges();
        public Task SaveCHangesAsync();

        // Repos
        public IBookRepository BookRepository { get; }
        public ITagRepository TagRepository { get; }
        public IAuthorRepository AuthorRepository { get; }
        public IReviewRepository ReviewRepository { get; }
        public IPriceOfferRepository PriceOfferRepository { get; }
    }
}
