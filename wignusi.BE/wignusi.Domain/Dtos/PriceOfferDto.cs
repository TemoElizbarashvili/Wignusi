using System.ComponentModel.DataAnnotations;


namespace wignusi.Domain.Dtos
{
    public record PriceOfferDto(
        [Required][MaxLength(50)] string Text,
        [Required] decimal Price,
        [Required] Guid BookId
        );
}
