using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using wignusi.Domain.Dtos;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public OrderController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<OrderRm>>> GetAll()
        {
            return Ok(await _uow.OrderRepository.GetAllInRms());
        }


        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Create(OrderDto dto)
        {
            var order = await _uow.OrderRepository.MapDtoToOrder(dto);
            _uow.OrderRepository.Add(order);
            try
            {
                _uow.SaveChanges();
            }
            catch (Exception)
            {
                return Conflict(new { message = "Something went wrong, please try again." });
            }
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Edit(int orderId, string status)
        {
            var error = await _uow.OrderRepository.GetOrder(orderId);
            if (error is NotFoundError)
                return NotFound();
            await _uow.OrderRepository.ChangeStatus(orderId, status);
            try
            {
                await _uow.SaveChangesAsync();
            } catch(Exception)
            {
                return Conflict(new { message = "Something went wrong, Please try again." });
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("/filter")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<OrderRm>>> Filter(string status) {
            return Ok(await _uow.OrderRepository.Filter(status));
        }
    }
}
