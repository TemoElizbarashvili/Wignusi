using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;

namespace wignusi.Domain.Repository_Contracts
{
    public interface ITagRepository
    {
        public IQueryable<Tag> GetAll();
        public Tag GetById(string tag);
        public void CreateTag(Tag tag);
        public void DeleteTag(string tag);
    }
}
