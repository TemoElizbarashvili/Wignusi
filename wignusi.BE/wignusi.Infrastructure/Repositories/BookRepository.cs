using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Domain.Repository_Contracts;

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
            _context.SaveChanges();
        }

        public async Task CreateBookAsync(Book book)
        {
            await _context.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public void DeleteBook(Guid id)
        {
            var bookToDelete = this.GetById(id);
            _context.Remove(bookToDelete);
            _context.SaveChanges();
        }

        public async Task DeleteBookAsync(Guid id)
        {
            var bookToDelete = this.GetByIdAsync(id);
            _context.Remove(await bookToDelete);
            await _context.SaveChangesAsync();
        }

        public void EditBook(Book book)
        {
            var bookToEdit = _context.Books.SingleOrDefault(b => b.BookId == book.BookId);
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

                _context.SaveChanges();
            }
        }

        public async Task EditBookAsync(Book book)
        {
            var bookToEdit = _context.Books.SingleOrDefault(b => b.BookId == book.BookId);
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

                await _context.SaveChangesAsync();
            }
        }

        public IQueryable<Book> GetAll() => _context.Books;

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
            var book = _context.Books?.FirstOrDefault(b => b.BookId == id);
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
    }
}
