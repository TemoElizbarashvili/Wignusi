﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Errors;

namespace wignusi.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly WignusiDbContext _context;

        public OrderRepository(WignusiDbContext context)
        {
            _context = context;   
        }

        public void Add(Order order)
        {
            _context.Orders.Add(order);
        }

        public async Task ChangeStatus(int orderId, string status)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == orderId);
            if (order != null)
                order.Status = status;

        }

        public async Task<List<OrderRm>> GetAllInRms()
        {
            var bookQuantities = new List<BookQuantity>();

            var orderRms = await _context.Orders!.Include(o => o.Items!).Select(o => new OrderRm
            (
                o.OrderId,
                o.Name,
                o.Details!,
                o.Status,
                o.OrderTotal,
                o.Items!.Select(o => new BookQuantity(
                    o.Book!.Title,
                    o.Quantity
            )).ToArray()
            )).ToListAsync();
            return orderRms!;
        }

        public async Task<Object> GetOrder(int OrderId)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == OrderId);
            if (order == null)
                return new NotFoundError();
            return order;
        }

        public Task<List<Order>> GetOrders()
        {
            return _context.Orders.ToListAsync();
        }

        public Task<List<Order>> GetUserOrders(int userId)
        {
            var orders = _context.Orders.Where(o => o.UserId == userId);
            return orders.ToListAsync();
        }

        public async Task<Order> MapDtoToOrder(OrderDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == dto.UserId);
            if (user != null)
            {
                var order = new Order()
                {
                    Name = dto.Name,
                    Details = dto.Details,
                    Status = dto.Status,
                    User = user,
                    OrderTotal = dto.OrderTotal,
                    Items = new List<ShoppingCart>()
                };
                foreach (var id in dto.LineIds)
                {
                    var line = await _context.shoppingCarts.FirstOrDefaultAsync(s => s.ShoppingCartId == id);
                    if (line != null)
                    {
                        order.Items.Add(line);
                        line.UserId = null;
                        line.User = null;
                    }
                }
                return order;
            }
            return null!;
        }
    }
}
