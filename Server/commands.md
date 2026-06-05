# Useful Commands

## Docker
Build the docker image from the Dockerfile:
```bash
docker build -t wortschatz .
```

Build the docker compose services:
```bash
docker compose build
```

Start the docker compose services in the foreground:
```bash
docker compose up
```

Start the docker compose services in the background (detached):
```bash
docker compose up -d
```

Stop the docker compose services:
```bash
docker compose down
```

## Entity Framework Core Migrations
Create the initial database migration:
```bash
dotnet ef migrations add InitialCreate --project Wortschatz.Core --startup-project Wortschatz.WebApi
```

Add a new migration (replace `AddNoteEntity` with your migration name):
```bash
dotnet ef migrations add AddNoteEntity --project Wortschatz.Core --startup-project Wortschatz.WebApi
```

Apply pending migrations to update the database:
```bash
dotnet ef database update --project Wortschatz.Core --startup-project Wortschatz.WebApi
```

Remove the last unapplied migration:
```bash
dotnet ef migrations remove --project Wortschatz.Core --startup-project Wortschatz.WebApi
```

## Testing Payloads
Example payload for the register/login endpoints:
```json
{
  "email": "test@test.com",
  "password": "Test$1234"
}
```