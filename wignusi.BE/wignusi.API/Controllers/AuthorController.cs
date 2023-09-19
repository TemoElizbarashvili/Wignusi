using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wignusi.Domain.DataBase;
using wignusi.Domain.Dtos;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public AuthorController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<AuthorRm>> GetAll()
        {
            return Ok(_uow.AuthorRepository.GetAllInRm());
        }


        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<AuthorRm> GetById(int id)
        {
            var author = _uow.AuthorRepository.GetById(id);
            var authorToReturn = new AuthorRm(
                author.AuthorId,
                author.Name,
                author.Description,
                author.Nationality,
                author.Image,
                author.BooksLink!.Select(b => b.BookId).ToArray()
                );
            return Ok(authorToReturn);
        }


        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Delete(long id)
        {
            var error = _uow.AuthorRepository.DeleteAuthor(id);
            if (error is NotFoundError)
                return NotFound();
            try
            {
                _uow.SaveChanges();
            } 
            catch (Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public ActionResult Add(AuthorDto dto)
        {
            var authorToAdd = _uow.AuthorRepository.MapDtoToAuthor(dto);
            _uow.AuthorRepository.CreateAuthor(authorToAdd);
            try
            {
                _uow.SaveChanges();
            }
            catch(Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
            return CreatedAtAction(nameof(Add), authorToAdd);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public ActionResult Edit(AuthorDto dto, long id)
        {
            var author = _uow.AuthorRepository.MapDtoToAuthor(dto);
            var error = _uow.AuthorRepository.EditAuthor(author, id);
            if (error is NotFoundError)
                return NotFound();
            try
            {
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
            return Ok();
        }
    }
}
