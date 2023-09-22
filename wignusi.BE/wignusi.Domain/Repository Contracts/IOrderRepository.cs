using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IOrderRepository
    {
        public void Add(Order order);
        public Task<List<Order>> GetOrders();
        public Task<List<OrderRm>> GetAllInRms();
        public Task<List<Order>> GetUserOrders(int userId);
        public Task<Object> GetOrder(int OrderId);
        public Task<Order> MapDtoToOrder(OrderDto dto);
        public Task ChangeStatus(int orderId, string status);

    }
}
