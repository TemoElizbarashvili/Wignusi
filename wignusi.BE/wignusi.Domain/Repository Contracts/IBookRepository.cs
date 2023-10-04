using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Dtos;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IBookRepository
    {
        public IQueryable<Book> GetAll();
        public IQueryable<BookRm> GetAllInRm();
        public IEnumerable<BookRm> MapToBookRm(IQueryable<Book> books);
        public Task<BookDto> GetBookDto(Guid bookid);
        public Task<Book> GetByIdAsync(Guid id);
        public Book GetById(Guid id);
        public Task CreateBookAsync(Book book);
        public void CreateBook(Book book);
        public Task DeleteBookAsync(Guid id);
        public void DeleteBook(Book book);
        public Task EditBookAsync(Book book, Guid bookid);
        public void EditBook(Book book, Guid bookid);
        public int Count();
        public object Filter(SearchBookParameters @params);
        public Book MapDtoToBook(BookDto bookDto);
    }
}
