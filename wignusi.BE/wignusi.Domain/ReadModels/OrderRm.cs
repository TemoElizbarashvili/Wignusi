namespace wignusi.Domain.ReadModels
{
    public record BookQuantity(
        string Title,
        int Quantity
        );

    public record OrderRm(
        int OrderId,
        string Name,
        string Details,
        string Status,
        decimal Total,
        BookQuantity[] Books
        );
}
