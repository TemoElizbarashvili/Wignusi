using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public CartController(IUnitOfWork uow) => _uow = uow;

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<IList<CartRm>>> Get(int userId)
        {
            var listToReturn = await _uow.ShoppingCartRepository.GetLines(userId);
            return Ok(listToReturn);
        }

        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Add(CartDto dto)
        {
            var cartLine = new ShoppingCart
            {
                BookId = dto.BookId,
                UserId = dto.UserId,
                Quantity = dto.Quantity
            };
            await _uow.ShoppingCartRepository.CreateLine(cartLine);

            try
            {
                await _uow.SaveChangesAsync();
            } catch (Exception)
            {
                return Conflict(new { message = "Soemthing went wrong when adding cart line, Please try again" });
            }

            return CreatedAtAction(nameof(Add), dto);
        }


        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Edit(int cartId, int quantity)
        {
            if (quantity < 0)
                return Conflict(new { message = "Quantity can not be below 1" });
            await _uow.ShoppingCartRepository.SetQuantity(cartId, quantity);
            try
            {
                await _uow.SaveChangesAsync();
            } catch
            {
                return Conflict(new { message = "Something went wrong Please try again" });
            }
            return Ok();
        }


        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete(int userId)
        {
            await _uow.ShoppingCartRepository.DeleteLines(userId);
            try
            {
                await _uow.SaveChangesAsync();
            }
            catch
            {
                return Conflict();
            }
            return NoContent();
        }


        [HttpDelete("/{cartId}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteLine(int cartId)
        {
            var error = await _uow.ShoppingCartRepository.DeleteLine(cartId);
            if (error is NotFoundError)
                return NotFound();
            try
            {
                await _uow.SaveChangesAsync();
            }
            catch
            {
                return Conflict();
            }
            return NoContent();
        }
    }
}
