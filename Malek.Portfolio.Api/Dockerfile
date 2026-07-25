FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Malek.Portfolio.Api.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV PORT=10000
# Render's containers cap inotify instances well below what the default
# appsettings.json hot-reload file watcher needs, crashing startup — disable it.
ENV DOTNET_hostBuilder__reloadConfigOnChange=false
EXPOSE 10000

CMD ["sh", "-c", "ASPNETCORE_URLS=http://+:$PORT dotnet Malek.Portfolio.Api.dll"]
