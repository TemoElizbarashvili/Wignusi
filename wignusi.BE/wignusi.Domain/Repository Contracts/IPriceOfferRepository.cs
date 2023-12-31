﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Dtos;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface IPriceOfferRepository
    {
        public IQueryable<PriceOffer> GetAll();
        public IEnumerable<PriceOfferRm> GetAllInRm();
        public PriceOffer GetByBookId(long bookId);
        public object? Delete(int id);
        public void Create(PriceOffer priceOffer);
        public PriceOffer MapDtoToPriceOffer(PriceOfferDto dto);
    }
}
