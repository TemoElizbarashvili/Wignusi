using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IPriceOfferRepository
    {
        public IQueryable<PriceOffer> GetAll();
        public PriceOffer GetByBookId(long bookId);
        public void Delete(int id);
        public void Create(PriceOffer priceOffer);
    }
}
