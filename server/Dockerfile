FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Directory.Build.props Directory.Packages.props ./
COPY MinGo.Wayfinder.slnx ./
COPY src/ src/
COPY migrations/ migrations/

RUN dotnet publish src/MinGo.Wayfinder.API/MinGo.Wayfinder.API.csproj -c Release -o /app/publish --no-self-contained

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "MinGo.Wayfinder.API.dll"]
