namespace wignusi.Domain.Entities
{
    public class Accessory
    {
        public int AccessoryId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set;}
        public string Brand { get; set; } = string.Empty;
        public int Amount { get; set; }

    }
}
