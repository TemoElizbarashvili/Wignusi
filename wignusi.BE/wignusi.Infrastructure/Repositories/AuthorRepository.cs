using Microsoft.EntityFrameworkCore;
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
using wignusi.Infrastructure.Errors;

namespace wignusi.Infrastructure.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly WignusiDbContext _context;

        public AuthorRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public void CreateAuthor(Author author)
        {
            _context.Authors.Add(author);
        }

        public async Task CreateAuthorAsync(Author author)
        {
            await _context.Authors.AddAsync(author);
        }

        public Object? DeleteAuthor(long id)
        {
            var authorToDelete = _context.Authors.Where(a => a.AuthorId == id).FirstOrDefault();
            if (authorToDelete == null)
                return new NotFoundError();
            if (authorToDelete != null)
            {
                _context.Remove(authorToDelete);
            }
            return null;
        }

        public async Task DeleteAuthorAsync(long id)
        {
            var authorToDelete = await _context.Authors.Where(a => a.AuthorId == id).FirstOrDefaultAsync();
            if (authorToDelete != null)
            {
                _context.Remove(authorToDelete);
            }
        }

        public Object? EditAuthor(Author author, long id)
        {
            var authorToEdit = _context.Authors.SingleOrDefault(a => a.AuthorId == id);
            if (authorToEdit == null)
                return new NotFoundError();
            if(authorToEdit != null)
            {
                authorToEdit.Name = author.Name;
                authorToEdit.Description = author.Description;
                authorToEdit.Nationality =  author.Nationality;
                authorToEdit.Image = author.Image;
            }
            return null;
        }

        public async Task<Object?> EditAuthorAsync(Author author, long id)
        {
            var authorToEdit = await _context.Authors.SingleOrDefaultAsync(a => a.AuthorId == id);
            if (authorToEdit == null)
                return new NotFoundError();
            if (authorToEdit != null)
            {
                authorToEdit.Name = author.Name;
                authorToEdit.Description = author.Description;
                authorToEdit.Nationality = author.Nationality;
                authorToEdit.Image = author.Image;
            }
            return null;
        }

        public IQueryable<Author> GetAll()
        {
            IQueryable<Author> authorsList = _context.Authors;
            return authorsList;
        }

        public IEnumerable<AuthorRm> GetAllInRm()
        {
            var authorsRmList = _context.Authors.Include(a => a.BooksLink).Select(a => new AuthorRm
            (
                a.AuthorId,
                a.Name,
                a.Description,
                a.Nationality,
                a.Image,
                a.BooksLink!.Select(bl => bl.BookId).ToArray()
            )).ToList();
            return authorsRmList;
        }

        public Author GetById(long id)
        {
            var authorToReturn = _context.Authors.SingleOrDefault(a => a.AuthorId == id);
            if (authorToReturn != null) return authorToReturn;
            else return null!;
        }

        public async Task<Author> GetByIdAsync(long id)
        {
            var authorToReturn = await _context.Authors.SingleOrDefaultAsync(a => a.AuthorId == id);
            if (authorToReturn != null) return authorToReturn;
            else return null!;
        }

        public Author MapDtoToAuthor(AuthorDto dto)
        {
            var author = new Author
            {
                Name = dto.Name,
                Description = dto.Description,
                Nationality = dto.Nationality,
                Image = dto.Image,
            };
            return author;
        }
    }
}
