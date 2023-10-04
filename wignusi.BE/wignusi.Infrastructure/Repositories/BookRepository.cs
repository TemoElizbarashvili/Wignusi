using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Dtos;
using wignusi.Infrastructure.Errors;

namespace wignusi.Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly WignusiDbContext _context;

        public BookRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public int Count()
        {
            return _context.Books.Count();
        }

        public void CreateBook(Book book) {
            _context.Books.Add(book);
        }

        public async Task CreateBookAsync(Book book)
        {
            await _context.AddAsync(book);
        }

        public void DeleteBook(Book book)
        {
            _context.Remove(book);
        }

        public async Task DeleteBookAsync(Guid id)
        {
            var bookToDelete = this.GetByIdAsync(id);
            _context.Remove(await bookToDelete);
        }

        public void EditBook(Book book, Guid bookid)
        {
            var bookToEdit = _context.Books.Include(b => b.AuthorsLink).Include(b => b.Tags)
                .SingleOrDefault(b => b.BookId.Equals(bookid));
            if (bookToEdit != null)
            {
                bookToEdit.Title = book.Title;
                bookToEdit.Description = book.Description;
                bookToEdit.Price = book.Price;
                bookToEdit.Promotion = book.Promotion;
                bookToEdit.AuthorsLink = book.AuthorsLink;
                bookToEdit.Publisher = book.Publisher;
                bookToEdit.PublishedOn = book.PublishedOn;
                bookToEdit.IsAvialable = book.IsAvialable;
                bookToEdit.Tags = book.Tags;
            }
        }

        public async Task EditBookAsync(Book book, Guid bookid)
        {
            var bookToEdit = await _context.Books.SingleOrDefaultAsync(b => b.BookId.Equals(bookid));
            if (bookToEdit != null)
            {
                bookToEdit.Title = book.Title;
                bookToEdit.Description = book.Description;
                bookToEdit.Price = book.Price;
                bookToEdit.Promotion = book.Promotion;
                bookToEdit.AuthorsLink = book.AuthorsLink;
                bookToEdit.Publisher = book.Publisher;
                bookToEdit.PublishedOn = book.PublishedOn;
                bookToEdit.IsAvialable = book.IsAvialable;
            }
        }

        public IQueryable<Book> GetAll() => _context.Books.Include(b => b.Tags).Include(t => t.AuthorsLink);

        public IQueryable<BookRm> GetAllInRm()
        {
#nullable disable
            var books = _context?.Books?.Include(b => b.Tags)
                .Include(b => b.Reviews)
                .Include(b => b.AuthorsLink).ThenInclude(al => al.Author)
                .OrderBy(b => b.BookId)
                .Select(b => new BookRm
#nullable enable
                (
                b.BookId,
                b.Title,
                b.Description,
                b.Publisher ?? "Unknown",
                b.PublishedOn,
                b.Price,
                b.IsAvialable,
                b.Promotion == null ? b.Price : b.Promotion.NewPrice,
                b.Promotion == null ? "no Promotional text" : b.Promotion.PromotionalText,
                b.AuthorsLink!.OrderBy(a => a.Order)
                                .Select(a => a.Author.Name)
                                .ToArray() ?? Array.Empty<string>(),
#nullable disable
                b.Tags.Select(t => t.TagId).ToArray() ?? Array.Empty<string>(),
#nullable enable
                b.Reviews == null ? 0 : b.Reviews.Count(),
                b.Image
            ));

            return books!;
        }

        public Book GetById(Guid id)
        {
            var book = _context.Books?.Include(b => b.Tags).Include(b => b.AuthorsLink).FirstOrDefault(b => b.BookId == id);
            if (book != null)
                return book;
            else
                return null!;
        }

        public async Task<Book> GetByIdAsync(Guid id)
        {
            var book = await _context!.Books.FirstOrDefaultAsync(b => b.BookId == id);
            if (book != null) return book;
            else return null!;
        }

        public IEnumerable<BookRm> MapToBookRm(IQueryable<Book> books)
        {
#nullable disable
            var booksRm = books.Include(b => b.Tags)
                .Include(b => b.Reviews)
                .Include(b => b.AuthorsLink).ThenInclude(al => al.Author)
                .OrderBy(b => b.BookId)
                .Select(b => new BookRm
#nullable enable
                (
                b.BookId,
                b.Title,
                b.Description,
                b.Publisher ?? "Unknown",
                b.PublishedOn,
                b.Price,
                b.IsAvialable,
                b.Promotion == null ? b.Price : b.Promotion.NewPrice,
                b.Promotion == null ? "no Promotional text" : b.Promotion.PromotionalText,
                b.AuthorsLink!.OrderBy(a => a.Order)
                                .Select(a => a.Author.Name)
                                .ToArray() ?? Array.Empty<string>(),
#nullable disable
                b.Tags.Select(t => t.TagId).ToArray() ?? Array.Empty<string>(),
#nullable enable
                b.Reviews == null ? 0 : b.Reviews.Count(),
                b.Image
            ));

            return booksRm;
        }
   
        public object Filter(SearchBookParameters @params)
        {
            IQueryable<Book> books = _context.Books.Include(b => b.Tags)
                                                    .Include(b => b.AuthorsLink!)
                                                    .ThenInclude(al => al.Author);

            if (!string.IsNullOrEmpty(@params.Ganre))
                books = books.Where(b => b.Tags!.Any(t => t.TagId.Equals(@params.Ganre)));

            if (@params.onlySales == true)
                books = books.Where(b => b.Promotion != null);

            if (@params.onlyAvialables == true)
                books = books.Where(b => b.IsAvialable == true);

            if (@params.PublishedFrom != null)
                books = books.Where(b => b.PublishedOn >= @params.PublishedFrom);

            if(!string.IsNullOrEmpty(@params.Title))
                books = books.Where(b => b.Title.Contains(@params.Title));

            if (!string.IsNullOrEmpty(@params.AuthorName))
            {
                books = books.Where(b => b.AuthorsLink!.Any(b => b.Author.Name.Contains(@params.AuthorName)));
            }

            if ((@params.Page - 1) * @params.PageSize > this.Count())
                return new BadRequestError();

            var pagesToSkip = (@params.Page - 1) * @params.PageSize;
            var amountToTake = @params.PageSize;

            if(books != null)
            {
                books = books.Skip(pagesToSkip).Take(amountToTake);
                var booksList = this.MapToBookRm(books);

                if (booksList != null)
                    return booksList;
                else return new NotFoundError();
            }
            else return new NotFoundError();
        }

        private Author MapAuthorDtoToAuthor(AuthorDto author)
        {
            var authorr = new Author
            {
                Name = author.Name,
                Description = author.Description,
                Image = author.Image,
                Nationality = author.Nationality
            };
            return authorr;
        }

        public Book MapDtoToBook(BookDto bookDto)
        {
            var bookId = Guid.NewGuid();
            
            var book = new Book
            {
                BookId = bookId,
                Title = bookDto.Title,
                Description = bookDto.Description,
                Image = bookDto.Image,
                Publisher = bookDto.Publisher,
                PublishedOn = bookDto.Published,
                Price = bookDto.Price,
                IsAvialable = bookDto.IsAvialable,
                AuthorsLink = new List<BookAuthor>(),
                Tags = new List<Tag>()
            };
            for (byte i = 0; i< bookDto.authorsIds?.Length; i++ )
            {
                var author = _context.Authors.Include(a => a.BooksLink).FirstOrDefault(a => a.AuthorId == bookDto.authorsIds[i]);
                if (author != null)
                    book.AuthorsLink.Add(new BookAuthor
                    {
                        Book = book,
                        Author = author,
                        Order = i
                    });
            }
            for (byte i = 0; i < bookDto.authors?.Length; i++)
            {
                var author = new Author
                {
                    Description = bookDto.authors[i].Description,
                    Name = bookDto.authors[i].Name,
                    Image = bookDto.authors[i].Image,
                    Nationality = bookDto.authors[i].Nationality
                };
                book.AuthorsLink.Add(new BookAuthor
                {
                    Book = book,
                    Author = author,
                    Order = i
                });
            }
            foreach (var tag in bookDto.tags)
            {
                var tagFromDb = _context.Tags.Where(t => t.TagId.Equals(tag)).FirstOrDefault();
                if (tagFromDb != null)
                {
                    book.Tags?.Add(tagFromDb);
                }
                else book.Tags?.Add(new Tag { TagId = tag });
            }
            return book;
        }

        public async Task<BookDto> GetBookDto(Guid bookid)
        {
            var book = await _context.Books.Include(b => b.AuthorsLink!).ThenInclude(b => b.Author)
                                            .Include(b => b.Tags).FirstOrDefaultAsync(b => b.BookId.Equals(bookid));
            if (book != null)
            {
                var bookDto = new BookDto(
                    book!.Title,
                    book!.Description,
                    book!.Image,
                    book.Publisher!,
                    book!.PublishedOn,
                    book!.Price,
                    book!.IsAvialable,
                    null,
                    book!.AuthorsLink!.Select(a => a.AuthorId).ToArray(),
                    book!.Tags!.Select(t => t.TagId).ToArray()
                        );
                return bookDto;
            }
            return null!;

        }
    }
}
