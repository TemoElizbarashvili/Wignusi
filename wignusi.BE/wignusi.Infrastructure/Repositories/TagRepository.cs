using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;
using wignusi.Domain.Repository_Contracts;

namespace wignusi.Infrastructure.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly WignusiDbContext _context;

        public TagRepository(WignusiDbContext context)
        {
            _context = context;
        }

        public void CreateTag(Tag tag)
        {
            _context.Tags.Add(tag);
        }

        public void DeleteTag(string tag)
        {
            var tagToDelete = _context.Tags.FirstOrDefault(t => t.TagId.Equals(tag));
            if (tagToDelete != null)
            {
                _context.Tags.Remove(tagToDelete);
            }
        }

        public IQueryable<Tag> GetAll()
        {
            IQueryable<Tag> tagsToReturn = _context.Tags;
            return tagsToReturn;
        }

        public IEnumerable<TagRm> GetAllInRm()
        {
            var tagRms = _context.Tags.Select(t => new TagRm(t.TagId));
            return tagRms.ToArray();
        }

        public Tag GetById(string tag)
        {
            var tagToReturn = _context.Tags.FirstOrDefault(t => t.TagId.Equals(tag));
            if (tagToReturn != null) return tagToReturn;
            else return null!;
        }

        public IEnumerable<TagRm> MapToRm(IQueryable<Tag> tags)
        {
            var tagsToReturn = tags.Select(t => new TagRm(
                t.TagId)).ToArray();
            return tagsToReturn;
        }
    }
}
