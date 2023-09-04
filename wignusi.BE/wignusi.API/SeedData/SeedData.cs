using wignusi.Domain.DataBase;
using wignusi.Domain.Entities;

namespace wignusi.API.SeedData
{
    public class SeedData
    {
        private readonly WignusiDbContext _context;
        public SeedData(WignusiDbContext context)
        {
            _context = context;
        }

        public void SeedBooks()
        {

            if (!_context!.Books.Any())
            {
                var author1 = new Author
                {
                    Name = "აგათა კრისტი",
                    Description = "აგათა კრისტი — ინგლისელი დეტექტიური ჟანრის მწერალი.",
                    Image = "https://apiv1.biblusi.ge/storage/author/qZ4ytl34g0QZjzUwIC2miNDDG3oT1J1ibrQZFViN.jpg",
                    Nationality = "ინგლისი"
                };
                var author2 = new Author
                {
                    Name = "ჟიულ ვერნი",
                    Description = @"ჟიულ გაბრიელ ვერნი (ფრანგ. Jules Gabriel Verne; დ. 8 თებერვალი,
                1828, ნანტი, საფრანგეთი — გ. 24 მარტი, 1905, ამიენი, საფრანგეთი) — ფრანგი მწერალი, კლასიკური სათავგადასავლო ლიტერატორი. 
                მეცნიერულ-ფანტასტიკური რომანის ჟანრის ერთ-ერთი ფუძემდებელი. ",
                    Image = "https://apiv1.biblusi.ge/storage/author/iWxLuiNeBFQxDJmNbuw2OMaZQYjkq3HNmxxgf5jE.jpg",
                    Nationality = "ფრანგი"
                };

                var book1Id = new Guid();
                var book2Id = new Guid();
                var book3Id = new Guid();
                var book4Id = new Guid();

                var booksToSeed = new Book[]
                {
        new Book
        {
            BookId = book1Id,
            Title = "დიდი ოთხეული",
            Description = "„დიდი ოთხეული“ - საიდუმლო ორგანიზაცია; „დიდი ოთხეულის“ წევრები" +
            " - N1 ბოროტი, N2 მდიდარი, N3 მეცნიერი და N4 „გამანადგურებელი“; „დიდი ოთხეულის“" +
            " მიზანი - გაბატონება კაცობრიობაზე!",
            IsAvialable = true,
            Price = 11.95m,
            Publisher = "წიგნუსი",
            Image = "https://api.palitral.ge/storage/book/GAgyAR0UqOd7oJOy58fhMLku33gp43SNBAQ5txRM.png.webp",
            Promotion = null,
            Reviews = null,
            AuthorsLink = new BookAuthor[]
            {
                new BookAuthor
                {
                    Author = author1,
                    BookId = book1Id,
                    Order = 1
                }
            }
        },
        new Book
        {

            BookId = book2Id,
            Title = "და აღარავინ დარჩა",
            Description = "ანმარტოებულ კუნძულზე ერთმანეთთან არაფრით დაკავშირებული ათი ადამიანი მიწვევით ჩადის, მაგრამ..." +
            " მასპინძლები არსად ჩანან. სასტუმრო ოთახში, ლანგარზე" +
            ", ფაიფურის ათი პატარა ინდიელის ფიგურა დევს, ხოლო სტუმრების საძინებელში მხიარული საბავშვო ლექსია კედელზე გაკრული.",
            IsAvialable = true,
            Publisher = "წიგნუსი",
            Image = "https://saba.com.ge/content/images/book/o/10b70f16143e45c6b3aa141302b9d3e4.png",
            Price = 13.95m,
            Promotion = null,
            Reviews = null,
            AuthorsLink = new BookAuthor[]
            {
                new BookAuthor
                {
                    Author = author1,
                    BookId = book2Id,
                    Order = 1
                }
            }
        },
        new Book
        {
            BookId = book3Id,
            Title = "საიდუმლო კუნძული",
            Description = "წიგნში მოთხრობასთან ერთად გაეცნობით ავტორის ბიოგრაფიასა და იმ ისტორიულ კონტექსტებს," +
            " რომლის მიხედვითაც შეიქმნა ნაწარმოები. - ჟიულ ვერნის რომანები სამეცნიერო ფანტასტიკის ჟანრში შექმნილი აღიარებული შედევრებია." +
            " 'საიდუმლო კუნძული' ტყვეობიდან გამოქცეული ხუთი მეგობრის შესახებ მოგვითხრობს, რომლებიც უკაცრიელ კუნძულზე აეროსტატით დაეშვებიან.",
            IsAvialable = true,
            Publisher = "წიგნუსი",
            Image = "https://apiv1.biblusi.ge/storage/book/fy4CgLRMfJ9VyiHW8CPFsnOEaXOFAfcPSGU1prQ6.jpg",
            Price = 11.95m,
            Promotion = null,
            Reviews = null,
            AuthorsLink = new BookAuthor[]
            {
                new BookAuthor
                {
                    Author = author2,
                    BookId = book3Id,
                    Order = 1
                }
            }
        },
        new Book
        {
            BookId = book4Id,
            Title = "80 000 კილომეტრი წყალქვეშ",
            Description = "შეუერთდი სახელგანთქმულ მეცნიერს, პიერ ანორაკს, რომელიც ზღვის საზარელი ურჩხულის საძებნელად მიემგზავრება." +
            " მეცნიერის თავგადასავალი მაშინ იწყება, როცა ოკეანის ბნელსა და იდუმალ სიღრმეებში შეშლილ კაპიტან ნემოს ჩაუვარდება ტყვედ." +
            " მოგზაურობისას პიერ ანორაკსის სიცოცხლეს არაერთხელ დაემუქრება საფრთხე.",
            IsAvialable = true,
            Publisher = "წიგნუსი",
            Image = "https://elibrary.sou.edu.ge/files/books/book-417/cover-417.jpg",
            Price = 9.95m,
            Promotion = null,
            Reviews = null,
            AuthorsLink = new BookAuthor[]
            {
                new BookAuthor
                {
                    Author = author2,
                    BookId = book4Id,
                    Order = 1
                }
            }
        },
                };
                _context.Books.AddRange(booksToSeed);
                _context.SaveChanges();
            }

        }
    }
}
