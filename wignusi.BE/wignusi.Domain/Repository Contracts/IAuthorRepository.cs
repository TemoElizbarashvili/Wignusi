using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IAuthorRepository
    {
        public Task<IQueryable<Author>> GetAllAsync();
        public IQueryable<Author> GetAll();
        public Task<Author> GetByIdAsync(long id);
        public Book GetById(long id);
        public Task CreateAuthorAsync(Author author);
        public void CreateAuthor(Author author);
        public Task DeleteAuthorAsync(long id);
        public void DeleteAuthor(long id);
        public Task EditAuthorAsync(Author author);
        public void EditAuthor(Author author);
    }
}
