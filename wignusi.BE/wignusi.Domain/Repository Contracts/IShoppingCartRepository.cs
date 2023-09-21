using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IShoppingCartRepository {
        public Task<IList<CartRm>> GetLines(int userId);
        public Task CreateLine(ShoppingCart cartLine);
        public Task DeleteLines(int userId);
        public Task<object> DeleteLine(int cartId);
        public Task SetQuantity(int cartId, int quantity);

    }
}
