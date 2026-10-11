using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MinGo.Wayfinder.Infrastructure.Persistence.Converters;

public class DateTimeToLongConverter : ValueConverter<long, long>
{
    public DateTimeToLongConverter()
        : base(
            v => v,
            v => v)
    {
    }
}

public static class DateTimeExtensions
{
    public static long ToUnixMilliseconds(this DateTime dateTime)
    {
        return new DateTimeOffset(dateTime).ToUnixTimeMilliseconds();
    }

    public static DateTime FromUnixMilliseconds(long milliseconds)
    {
        return DateTimeOffset.FromUnixTimeMilliseconds(milliseconds).UtcDateTime;
    }
}
