---
name: wortschatz-create-entity
description: Guide to adding a new entity route (add, view, list) in the Wortschatz App.
---

# Wortschatz Create Entity Route Skill

Follow these concise steps to create a new route entity in the Wortschatz app using established patterns and best practices.

## 1. Define the Model
Create your entity model in the `models/` directory. Use classes with constructors to provide default values.
Example for `IEntity.ts`:
```typescript
export class Entity {
    id?: string;
    // other properties
    constructor() {
        this.id = undefined;
    }
}
```

## 2. Create the Route Directory
Create a new directory for your entity under `app/(app)/` (e.g., `app/(app)/entity`).

## 3. Implement Add Page (`add-entity.tsx`)
Create a page to add new entities.
- **State**: Use `useState(new Entity())`.
- **Hook**: Use `useBaseEntity({ entity: 'Entity', viewRoute: '/entity/view-entity' })` for the `onAdd` operation.
- **UI Components**: Wrap content in `ContainerView`, `ContainerDrawer`, and `ContainerContent`.
- **Actions**: Use `CancelSubmitButton` inside a `Card` for submission.

## 4. Implement View/Edit Page (`view-entity.tsx`)
Create a page to view and edit existing entities.
- **Routing**: Get the ID via `useLocalSearchParams()`.
- **State**: Use `useEntityState<Entity>()` to manage form state.
- **Hook**: Use `useBaseEntity` for `onDetail`, `onUpdate`, and `onDelete`.
- **UI Components**: Use `PageToolbar` for the header and back button. Use `CancelSubmitButton` for Save/Delete actions.
- **Lifecycle**: Use `useFocusEffect` to fetch the entity detail when the screen is focused.

## 5. Implement List Page (`entity-list.tsx`)
Create a page to list all entities.
- **Data Fetching**: Use `baseEntityDataService.GetList('Entity', queryParams)` to fetch data. Support filtering (e.g., via OData `$filter`).
- **UI Components**: Use `PageToolbar` with an action label and icon (e.g., "add") to navigate to the Add page.
- **List Rendering**: Use a `FlatList` with `Pressable` items that navigate to the View page when tapped. Show an `ActivityIndicator` while loading.
- **Lifecycle**: Use `useFocusEffect` to refresh the list when navigating back.

## 6. Create UI Components
Build any necessary specific UI components (like `AddEditEntity.tsx` or `EntityListItem.tsx`) in the `components/` directory, styling them with Tailwind CSS (`className`) avoiding inline styles.
