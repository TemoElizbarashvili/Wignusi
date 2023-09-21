using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Infrastructure.Errors;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public AuthController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<List<UserRm>>> GetAll()
        {
            return await _uow.UserRepository.GetAllInRm();
        }


        [HttpPost("register")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Register(UserDto request)
        {
            var user = _uow.UserRepository.MapDtoToUser(request);
            await _uow.UserRepository.AddUser(user);
            try
            {
               await _uow.SaveChangesAsync();
            } catch(Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }

            return CreatedAtAction(nameof(Register), user);
        }

        [HttpPost("login")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<LoginRm>> Login(LoginDto request)
        {
            var user = await _uow.UserRepository.GetByEmail(request.Email);

            if (user == null)
                return BadRequest("User name or password is incorect");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return BadRequest("User name or password is incorect");

            string token = _uow.UserRepository.CreateToken(user);

            var refreshToken = _uow.UserRepository.GenerateRefreshToken();
            _uow.UserRepository.SetRefreshToken(refreshToken);

            var loginRm = new LoginRm
            (
                token,
                user.Role,
                user.UserId
            );
            return Ok(loginRm);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(409)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            var error = await _uow.UserRepository.DeleteUser(id);
            try
            {
                await _uow.SaveChangesAsync();
            } 
            catch(Exception ex)
            {
                return Conflict(new { message = ex.Message });
            }
            return error is NotFoundError ? NotFound() : NoContent();
        }


    }
}
