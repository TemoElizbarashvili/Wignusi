using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.UOF;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private int pageSize = 24;

        public BookController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<BookRm>> GetAll()
        {
            var booksList = _uow.BookRepository.GetAllInRm();
            var result = booksList.ToArray();
            if (result != null) return Ok(result);
            else return NotFound();
        }

        [HttpGet("{page}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<BookRm>> GetBooksForPage([FromRoute]int page = 1)
        {
            if ((page-1) * pageSize > _uow.BookRepository.Count())
            {
                return BadRequest();
            }
            var booksList = _uow.BookRepository.GetAllInRm().Skip((page - 1) * pageSize).Take(pageSize);
            if (booksList != null)
            {
                var result = booksList.ToArray();
                return Ok(result);
            }
            else return NotFound();
        }

    }
}
