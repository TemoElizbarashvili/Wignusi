using System.ComponentModel;

namespace wignusi.Infrastructure.Dtos
{
    public record SearchBookParameters(
        [DefaultValue(24)]
        int PageSize,

        [DefaultValue(1)]
        int Page,

        [DefaultValue(null)]
        string? Ganre,

        [DefaultValue(null)]
        DateTime? PublishedFrom,

        [DefaultValue(false)]
        bool onlySales,

        [DefaultValue(true)]
        bool onlyAvialables,

        [DefaultValue(null)]
        string? Title,

        [DefaultValue(null)]
        string? AuthorName
        );
}
