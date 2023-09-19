using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using wignusi.Domain.Dtos;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PriceOfferController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public PriceOfferController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public ActionResult<IEnumerable<PriceOfferRm>> GetAll()
        {
            return Ok(_uow.PriceOfferRepository.GetAllInRm());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Add(PriceOfferDto dto)
        {
            var priceOfferToAdd = _uow.PriceOfferRepository.MapDtoToPriceOffer(dto);
            _uow.PriceOfferRepository.Create(priceOfferToAdd);
            try
            {
                _uow.SaveChanges();
            }
            catch (Exception ex)
            {
                return Conflict(new { message = ex.Message, error = ex.StackTrace });
            }
            return CreatedAtAction(nameof(Add), priceOfferToAdd);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public IActionResult Delete(int id)
        {
            var error = _uow.PriceOfferRepository.Delete(id);
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
    }
}
