# Wortschatz App

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
- **Styling**: Uses **Tailwind CSS** (via NativeWind) for layout and utility styles.
- **Theming**: Use the `useStyling` hook and `Colors.ts` for theme-aware properties (e.g., text color, background).
- **Principles**: Clean, modern, and consistent design using standardized containers.

## Error Handling
- All errors should be gracefully handled and logged to the console using `console.error(error, { logMessage })`.
- User feedback should be provided via toast or inline messages (e.g., `setMessage` in forms).

## API Documentation
- API Documentation is available at http://localhost:5153/swagger/index.html
- Base URL is configured via `EXPO_PUBLIC_WORTSCHATZ_API_URL`.

## Coding Patterns
- **Services**: 
    - `DataService`: Base fetch wrapper handling authentication headers.
    - `BaseEntityDataService`: Generic CRUD operations for entities. Use `Create`, `Update`, `Delete`, `GetList`, and `GetDetail`.
- **Forms**:
    - Use model classes for state: `const [form, setForm] = useState(new Word())`.
    - Use a generic handler: `handleFormUpdate = (value: any, field: string) => setForm(prev => ({ ...prev, [field]: value }))`.
- **User Feedback**:
    - Use the `useToast` hook for temporary feedback: `const toast = useToast(); toast.show('Success!', Status.Success);`.
- **State Management**: Use **Providers** (e.g., `AuthProvider`, `ToastProvider`) for global state.

## UI Components
- **ContainerView**: Root wrapper for pages providing safe area and base layout.
- **ContainerDrawer**: Top-level header component that integrates with the navigation drawer.
- **ContainerContent**: Scrollable or fixed content area within a `ContainerView`.
- **Card**: Standardized container for grouping form fields or list items.
- **CancelSubmitButton**: Combined component for form actions (Cancel/Submit).

## Constraints
- Do not use inline styles for complex layouts; prefer Tailwind classes.
- Ensure all new components are responsive and work across both Light and Dark modes.
- Maintain type safety by always using defined models/interfaces from the `models/` directory.