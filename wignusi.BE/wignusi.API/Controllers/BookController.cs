using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using wignusi.Domain.Dtos;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Dtos;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF;
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

        [HttpGet("count")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public ActionResult<int> CountOf()
        {
            return Ok(_uow.BookRepository.Count());
        }

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
            } catch (Exception)
            {
                return Conflict(new { message = "An error occured while adding a book. Please try again" });
            }

            return Ok();
        }


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

