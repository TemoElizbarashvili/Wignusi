
namespace wignusi.Domain.ReadModels
{
    public record PriceOfferRm(
        int Id,
        decimal Price,
        string Text,
        Guid BookId
        );
}
