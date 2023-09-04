using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IBookRepository
    {
        public IQueryable<Book> GetAll();
        public IQueryable<BookRm> GetAllInRm();
        public Task<Book> GetByIdAsync(Guid id);
        public Book GetById(Guid id);
        public Task CreateBookAsync(Book book);
        public void CreateBook(Book book);
        public Task DeleteBookAsync(Guid id);
        public void DeleteBook(Guid id);
        public Task EditBookAsync(Book book);
        public void EditBook(Book book);
        public int Count();
    }
}
