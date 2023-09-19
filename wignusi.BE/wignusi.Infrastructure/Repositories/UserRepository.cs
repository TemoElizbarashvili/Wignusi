using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using wignusi.Domain.Entities;
using wignusi.Domain.Models;
using wignusi.Domain.Repository_Contracts;
using wignusi.Domain.DataBase;
using Microsoft.EntityFrameworkCore;
using wignusi.Domain.Dtos;
using wignusi.Infrastructure.Errors;
using wignusi.Domain.ReadModels;

namespace wignusi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly WignusiDbContext _context;
        private readonly IConfiguration _configuration;

        public UserRepository(IConfiguration configuration, WignusiDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public string CreateToken(User user)
        {  
            List<Claim> claims = new List<Claim>
            {
                
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.MobilePhone, user.Phone),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings:Key").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        public RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
            if (user != null)
                return user;
            return null!;
        }

        public User MapDtoToUser(UserDto dto)
        {
            var passwordHash = HashPassword(dto.Password);
            var user = new User
            {
                Username = dto.Username,
                Email = dto.EmailAddress,
                Phone = dto.Phone,
                PasswordHash = passwordHash,
                Role = dto.Role
            };
            return user;
        }

        private string HashPassword(string password)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }

        public void SetRefreshToken(RefreshToken newRefreshToken)
        {
            //var cookieOptions = new CookieOptions
            //{
            //    HttpOnly = true,
            //    Expires = newRefreshToken.Expires
            //};
            //Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            //user.RefreshToken = newRefreshToken.Token;
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<List<UserRm>> GetAllInRm()
        {
            var userRms = _context.Users.Select(u => new UserRm(
                u.UserId,
                u.Username,
                u.Email,
                u.Phone,
                u.PasswordHash,
                u.Role
                ));
            return await userRms.ToListAsync();
        }

        public async Task AddUser(User user)
        {
            await _context.Users.AddAsync(user); 
        }

        public async Task<object> DeleteUser(int id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);

            if (userToDelete == null)
                return new NotFoundError();

            _context.Users.Remove(userToDelete);

            return userToDelete;
        }
    }
}
