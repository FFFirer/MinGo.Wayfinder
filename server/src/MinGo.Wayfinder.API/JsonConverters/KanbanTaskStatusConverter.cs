using System.Text.Json;
using System.Text.Json.Serialization;
using MinGo.Wayfinder.Domain.Enums;

namespace MinGo.Wayfinder.API.JsonConverters;

public class KanbanTaskStatusConverter : JsonConverter<KanbanTaskStatus>
{
    public override KanbanTaskStatus Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        return value switch
        {
            "todo" => KanbanTaskStatus.Todo,
            "in_progress" => KanbanTaskStatus.InProgress,
            "review" => KanbanTaskStatus.Review,
            "done" => KanbanTaskStatus.Done,
            _ => throw new JsonException($"Unknown status: {value}")
        };
    }

    public override void Write(Utf8JsonWriter writer, KanbanTaskStatus value, JsonSerializerOptions options)
    {
        var stringValue = value switch
        {
            KanbanTaskStatus.Todo => "todo",
            KanbanTaskStatus.InProgress => "in_progress",
            KanbanTaskStatus.Review => "review",
            KanbanTaskStatus.Done => "done",
            _ => throw new JsonException($"Unknown status: {value}")
        };
        writer.WriteStringValue(stringValue);
    }
}
