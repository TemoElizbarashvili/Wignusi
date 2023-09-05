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
    public class PriceOfferRepository : IPriceOfferRepository
    {
        private readonly WignusiDbContext _context;

        public PriceOfferRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public void Create(PriceOffer priceOffer)
        {
            _context.PriceOffers.Add(priceOffer);
        }

        public Object? Delete(int id)
        {
            var priceOfferToDelete = _context.PriceOffers.FirstOrDefault(po => po.PriceOfferId == id);
            if (priceOfferToDelete == null)
                return new NotFoundError();
            if (priceOfferToDelete != null)
            {
                _context.PriceOffers.Remove(priceOfferToDelete);
            }
            return null;
        }

        public IQueryable<PriceOffer> GetAll()
        {
            var priceOffers = _context.PriceOffers;
            return priceOffers.AsQueryable();
        }

        public IEnumerable<PriceOfferRm> GetAllInRm()
        {
            var result = _context.PriceOffers.Select(po => new PriceOfferRm(
                po.PriceOfferId,
                po.NewPrice,
                po.PromotionalText,
                po.BookId)
            ).AsEnumerable();
            return result;
        }

        public PriceOffer GetByBookId(long bookId)
        {
            var priceOffer = _context.PriceOffers.FirstOrDefault(po => po.BookId.Equals(bookId));
            if (priceOffer != null) return priceOffer;
            else return null!;
        }

        public PriceOffer MapDtoToPriceOffer(PriceOfferDto dto)
        {
            var priceOffer = new PriceOffer
            {
                NewPrice = dto.Price,
                PromotionalText = dto.Text,
                BookId = dto.BookId
            };
            return priceOffer;
        }
    }
}
