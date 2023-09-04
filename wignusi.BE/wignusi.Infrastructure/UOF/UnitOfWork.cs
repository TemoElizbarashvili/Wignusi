using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Repositories;
using wignusi.Infrastructure.UOF.Contract;

namespace wignusi.Infrastructure.UOF
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(WignusiDbContext context)
        {
            this.BookRepository = new BookRepository(context);
        }

        public IBookRepository BookRepository { get; }
    }
}
