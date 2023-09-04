using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Repository_Contracts;
using wignusi.Infrastructure.Repositories;

namespace wignusi.Infrastructure.UOF.Contract
{
    public interface IUnitOfWork
    {
        public IBookRepository BookRepository { get; }
    }
}
