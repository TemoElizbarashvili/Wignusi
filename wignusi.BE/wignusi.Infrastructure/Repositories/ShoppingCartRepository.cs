using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Errors;

namespace wignusi.Infrastructure.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly WignusiDbContext _context;

        public ShoppingCartRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public async Task CreateLine(ShoppingCart cartLine)
        {
            await _context.shoppingCarts.AddAsync(cartLine);
        }

        public async Task<object> DeleteLine(int cartId)
        {
            var lineToDelete = await _context.shoppingCarts.FirstOrDefaultAsync(sc => sc.ShoppingCartId == cartId);
            if (lineToDelete == null)
                return new NotFoundError();
            _context.shoppingCarts.Remove(lineToDelete);
            return lineToDelete;
        }

        public Task DeleteLines(int userId)
        {
            var cartsToDelete = _context.shoppingCarts.Where(sc => sc.UserId == userId);
            _context.RemoveRange(cartsToDelete);
            return Task.CompletedTask;
        }

        public async Task<IList<CartRm>> GetLines(int userId)
        {
            var cartLines = _context.shoppingCarts.Include(s => s.Book).Where(sc => sc.UserId == userId).Select(c => new CartRm(
                c.ShoppingCartId,
                c.Quantity,
                c.BookId,
                c.Book!.Image,
                c.Book.Title,
                c.Book.Price
                ));
            return await cartLines.ToListAsync();
        }

        public async Task SetQuantity(int cartId, int quantity)
        {
            var lineToChangeQuantityTo = await _context.shoppingCarts.FirstOrDefaultAsync(sc => sc.ShoppingCartId == cartId);
            if(quantity > 0 && lineToChangeQuantityTo != null)
                lineToChangeQuantityTo.Quantity = quantity;
        }
    }
}
