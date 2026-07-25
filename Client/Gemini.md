## Role
- You are a senior developer working on an existing **React Native** Expo code base.

## Code Structure
- All code should be succinct and follow best **SOLID and Clean Architecture** practices.
- **Routing**: Uses **Expo Router**.
    - `app/landing.tsx` & `app/login.tsx`: Public routes.
    - `app/(app)/`: Protected routes wrapped in an AuthProvider.
    - `app/(app)/(drawer)/`: Navigation drawer implementation.
- **Models**: Located in `models/`. Use classes for entities with constructors for default values (e.g., `Word`).

## UI & Styling
- **Styling**: Strictly avoid using React Native's `StyleSheet.create` or inline styles. Use **Tailwind CSS** (`className` via NativeWind) for all layout and utility styles.
- **Principles**: Clean, modern, and consistent design using standardized containers.

## Error Handling
- User feedback should be provided via toast messages (avoid inline `setMessage` state in forms).

## API Documentation
- API Documentation is available at http://localhost:5153/swagger/index.html
- Base URL is configured via `EXPO_PUBLIC_WORTSCHATZ_API_URL`.

## Coding Patterns
- **Services**: 
    - `DataService`: Base fetch wrapper handling authentication headers.
    - `BaseEntityDataService`: Generic CRUD operations for entities. Use `Create`, `Update`, `Delete`, `GetList`, and `GetDetail`.
- **Entity Hooks**:
    - `useBaseEntity`: Abstracts generic CRUD operations into React hooks (e.g., `onAdd`, `onUpdate`, `onDelete`, `onDetail`, `onEnhance`). Use this hook in pages for data fetching/mutations instead of calling `BaseEntityDataService` directly.
- **Forms**:
    - Use model classes for state: `const [form, setForm] = useState(new Word())`.
    - Use a generic handler: `handleFormUpdate = (value: any, field: string) => setForm(prev => ({ ...prev, [field]: value }))`.
- **User Feedback**:
    - Use the `useToast` hook for all user feedback: `const toast = useToast(); toast.show('Success!', Status.Success);`. Do not use inline state messages.
- **State Management**: Use **Providers** (e.g., `AuthProvider`, `ToastProvider`) for global state.

## UI Components
- **ContainerView**: Root wrapper for pages providing safe area and base layout.
- **ContainerDrawer**: Top-level header component that integrates with the navigation drawer.
- **ContainerContent**: Scrollable or fixed content area within a `ContainerView`.
- **Card**: Standardized container for grouping form fields or list items. Use relative path `./Card` when importing within the `components` directory.
- **CancelSubmitButton**: Combined component for form actions (Cancel/Submit/Delete/Enhance). Integrates cleanly with `useBaseEntity` hooks.

## Constraints
- Do not use inline styles or `StyleSheet.create` for complex layouts; prefer Tailwind classes.
- Ensure all new components are responsive in both mobile and web
- Maintain type safety by always using defined models/interfaces from the `models/` directory.