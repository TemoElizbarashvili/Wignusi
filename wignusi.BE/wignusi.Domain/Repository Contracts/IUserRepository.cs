using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.Models;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IUserRepository
    {
        public Task<User> GetByEmail(string email);
        public Task<List<User>> GetAll();
        public Task<List<UserRm>> GetAllInRm();
        public Task AddUser(User user);
        public Task<object> DeleteUser(int id);
        public string CreateToken(User user);
        public RefreshToken GenerateRefreshToken();
        public void SetRefreshToken(RefreshToken newRefreshToken);
        public User MapDtoToUser(UserDto dto);
    }
}
