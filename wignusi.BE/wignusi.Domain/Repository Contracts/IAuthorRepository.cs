using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IAuthorRepository
    {
        public IQueryable<Author> GetAll();
        public IEnumerable<AuthorRm> GetAllInRm();
        public Task<Author> GetByIdAsync(long id);
        public Author GetById(long id);
        public Task CreateAuthorAsync(Author author);
        public void CreateAuthor(Author author);
        public Task DeleteAuthorAsync(long id);
        public Object? DeleteAuthor(long id);
        public Task<Object?> EditAuthorAsync(Author author, long id);
        public Object? EditAuthor(Author author, long id);
        public Author MapDtoToAuthor(AuthorDto dto);
    }
}
