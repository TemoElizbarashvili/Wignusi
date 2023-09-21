using Microsoft.Extensions.Configuration;
using wignusi.Domain.DataBase;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Repositories;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.Infrastructure.UOF
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WignusiDbContext _context;
        public IBookRepository BookRepository { get; }

        public ITagRepository TagRepository { get; }

        public IAuthorRepository AuthorRepository { get; }

        public IReviewRepository ReviewRepository { get; }

        public IPriceOfferRepository PriceOfferRepository { get; }
        
        public IUserRepository UserRepository { get; }
        
        public IShoppingCartRepository ShoppingCartRepository { get; }

        public UnitOfWork(WignusiDbContext context, IConfiguration configuration)
        {
            _context = context;
            this.BookRepository = new BookRepository(context);
            this.AuthorRepository = new AuthorRepository(context);
            this.TagRepository = new TagRepository(context);
            this.ReviewRepository = new ReviewRepository(context);
            this.PriceOfferRepository = new PriceOfferRepository(context);
            this.UserRepository = new UserRepository(configuration, context);
            this.ShoppingCartRepository = new ShoppingCartRepository(context);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
