using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using wignusi.Domain.Dtos;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Dtos;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public BookController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("books")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<BookRm>>> GetAll()
        {
            var list = _uow.BookRepository.GetAllInRm().ToListAsync();
            var result = await list;
            return result;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookRm>),200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<BookRm>> GetBooksForPage([FromQuery] SearchBookParameters @params)
        {
            var filteredList = _uow.BookRepository.Filter(@params);
            if (filteredList is BadRequestError)
                return BadRequest();
            if (filteredList is NotFoundError)
                return NotFound();
            return Ok(filteredList);
        }

        [HttpGet("search")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<IList<BookRm>> Search(string search)
        {
            var list =  _uow.BookRepository.GetAll().Where(b => b.Title.Contains(search));
            var resultList = _uow.BookRepository.MapToBookRm(list).ToList();
            if (!resultList.Any())
                return NotFound();
            return Ok(resultList);
        }


        [HttpGet("/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<BookRm>> GetById(Guid id)
        {
            var bookList = _uow.BookRepository.GetAll().Include(b => b.AuthorsLink!).ThenInclude(a => a.Author);
            var book = await bookList.FirstOrDefaultAsync(b => b.BookId == id);

            if (book != null)
            {
                var bookRm = new BookRm(
                book.BookId,
                book.Title,
                book.Description,
                book.Publisher ?? "Unknown",
                book.PublishedOn,
                book.Price,
                book.IsAvialable,
                book.Promotion == null ? book.Price : book.Promotion.NewPrice,
                book.Promotion == null ? "no Promotional text" : book.Promotion.PromotionalText,
                book.AuthorsLink!.OrderBy(a => a.Order)
                                .Select(a => a.Author.Name)
                                .ToArray() ?? Array.Empty<string>(),
                book.Tags!.Select(t => t.TagId).ToArray() ?? Array.Empty<string>(),
                book.Reviews == null ? 0 : book.Reviews.Count(),
                book.Image
            );
                return Ok(bookRm);

            } else
            {
                return NotFound();
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delte/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Delete(Guid id)
        {
            var book = _uow.BookRepository.GetById(id);
            if (book is null)
                return NotFound();
            _uow.BookRepository.DeleteBook(book);
            try
            {
                _uow.SaveChanges();
            }catch(Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
            return NoContent();
        }


        [HttpGet("count")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public ActionResult<int> CountOf()
        {
            return Ok(_uow.BookRepository.Count());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public IActionResult Add(BookDto book)
        {
            var bookToAdd = _uow.BookRepository.MapDtoToBook(book);
            _uow.BookRepository.CreateBook(bookToAdd);

            try
            {
                _uow.SaveChanges();
            }
            catch (Exception)
            {
                return Conflict(new { message = "An error occured while adding a book. Please try again" });
            }

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Edit(BookDto book, Guid id)
        {
            var bookEdited = _uow.BookRepository.MapDtoToBook(book);
            _uow.BookRepository.EditBook(bookEdited, id);
            try
            {
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                return Conflict(new { message = ex.Message});
            }
            return Ok();
        }
    
    
    
    
    }
}

