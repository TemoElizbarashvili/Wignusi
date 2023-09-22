using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using wignusi.Domain.Entities;
using wignusi.Domain.ReadModels;

namespace wignusi.Domain.DataBase
{
    public class WignusiDbContext : DbContext
    {
        public WignusiDbContext(DbContextOptions<WignusiDbContext> options) : base(options) { }

        public DbSet<Book> Books => Set<Book>();
        public DbSet<Author> Authors => Set<Author>();
        public DbSet<PriceOffer> PriceOffers => Set<PriceOffer>();
        public DbSet<Tag> Tags => Set<Tag>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<Accessory> Accessories => Set<Accessory>();
        public DbSet<User> Users => Set<User>();
        public DbSet<ShoppingCart> shoppingCarts => Set<ShoppingCart>();
        public DbSet<Order> Orders => Set<Order>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookAuthor>().HasKey(x => new { x.BookId, x.AuthorId });
            modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
            modelBuilder.Entity<BookQuantity>().HasNoKey();
        }

    }
}
