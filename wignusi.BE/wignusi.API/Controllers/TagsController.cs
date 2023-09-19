using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public TagsController(IUnitOfWork uow)
        {
            _uow = uow;   
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<TagRm>> GetAll()
        {
            return Ok(_uow.TagRepository.GetAllInRm());
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Delete(string id)
        {
            var tagToDelte = _uow.TagRepository.GetById(id);
            if (tagToDelte == null)
                return NotFound();
            else
            {
                _uow.TagRepository.DeleteTag(id);
                try
                {
                    _uow.SaveChanges();
                }
                catch (Exception)
                {
                    return Conflict(new { message = "An error occured while adding a book. Please try again" });
                }
                return NoContent();
            }

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Add(string id)
        {
            var tag = new Tag{ TagId = id };
            _uow.TagRepository.CreateTag(tag);
            try
            {
                _uow.SaveChanges();
            }
            catch (Exception)
            {
                return Conflict(new { message = "An error occured while adding a book. Please try again" });
            }
            return CreatedAtAction(nameof(Add), tag);
        }


    }
}
