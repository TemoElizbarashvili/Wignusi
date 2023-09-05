using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.Repository_Contracts
{
    public interface ITagRepository
    {
        public IQueryable<Tag> GetAll();
        public Tag GetById(string tag);
        public void CreateTag(Tag tag);
        public void DeleteTag(string tag);
        public IEnumerable<TagRm> MapToRm(IQueryable<Tag> tags);
        public IEnumerable<TagRm> GetAllInRm();
    }
}
