#Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .

RUN dotnet restore "./Wortschatz.WebApi/Wortschatz.WebApi.csproj" --disable-parallel
RUN dotnet publish "./Wortschatz.WebApi/Wortschatz.WebApi.csproj" -c release -o /app

#Serve
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 5000