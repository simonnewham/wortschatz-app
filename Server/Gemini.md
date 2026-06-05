# Gemini AI Learnings: Wortschatz Server Project

This document serves as a reference for the architectural patterns, best practices, and lessons learned specifically within the ASP.NET Core backend.

## Architecture & Core Stack
- **Framework:** ASP.NET Core Web API.
- **Database & ORM:** Entity Framework Core (Code-First), utilizing `DataContext` which extends `IdentityDbContext<User>`.
- **Dependency Injection:** Heavy use of DI. Controllers remain "thin" and delegate all business logic to injected services (e.g., `IUserService`, `IBaseEntityService`).

## Data Models & Entities
- **Base Entity Rules:** All custom models inherit from `BaseEntity`. Crucially, the `Id` property (a `Guid`) has a `required` modifier, meaning it must be explicitly initialized (`Id = Guid.NewGuid()`) whenever a new instance is created.
- **User Settings & Info:** Extension of standard identity happens through the `UserSetting` entity (storing `FirstName`, `LastName`) which is linked to the `User` via foreign key `UserId`.

## Data Transfer Objects (DTOs)
- **Strict Separation:** DTOs are strongly separated based on the operation context.
  - **Write Operations:** e.g., `AddUserDto` handles sensitive payload fields like `Password` and `Email`.
  - **Read Operations:** e.g., `UserInfoDto` inherits from `BaseUserDto` and exposes only safe details like names and usernames.

## Service Layer Best Practices
- **Generic CRUD Services:** The `IBaseEntityService` pattern is used to centralize standard Create, Read, Update, and Delete operations for entities.
- **User Context:** `IUserService` and `UserService` abstract away context access, retrieving the current user's ID or claims and providing specialized endpoints like streaks calculation and profile updates.

## Controllers & Optimization
- **Thin Controllers:** The `UserController` simply maps incoming HTTP requests to service methods and returns DTOs.
- **Caching:** Output caching is applied on endpoints that compute aggregations over large datasets. For example, `[ResponseCache(Duration = 60)]` is used on the `getStreaks` endpoint to prevent database hammering on consecutive reads.
- **Authorization:** Standard ASP.NET Core `[Authorize]` guards the controllers, with `[AllowAnonymous]` scoped to specific open endpoints (like `register`).
- **Endpoint Documentation:** All new endpoints must always have a concise XML summary detailing their purpose, parameters, and return types.
