namespace wignusi.Domain.ReadModels
{
    public record AuthorRm(
        long Id,
        string Name,
        string Description,
        string Nationality,
        string Image,
        Guid[] BookIds
        );
}
