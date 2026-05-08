# Profile Feature Developer Guide

This document explains the profile feature in the `shop` application: routing, UI structure, business logic, API calls, state updates, validation, and expected user flows.

## Scope

The profile feature allows an authenticated user to:

- View and update account details.
- Upload a profile photo.
- Change password.
- Delete their account.
- Logout from the profile area.

The feature lives in:

- `apps/shop/src/app/features/profile`
- `libs/shared/auth/src/lib/data-access/auth.service.ts`
- `libs/shared/auth/src/lib/models/auth.models.ts`
- `libs/shared/ui/src/lib/components/molecules/avatar-upload`
- `libs/shared/util/src/lib/constants/endpoints.const.ts`

## Route Structure

Profile routes are defined in `apps/shop/src/app/features/feature.routes.ts`.

```ts
{
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () => import('./profile/pages/profile-layout/profile-layout').then(
    (m) => m.ProfileLayout,
  ),
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    {
      path: 'account',
      loadComponent: () => import('./profile/pages/account-page/account-page').then(
        (m) => m.AccountPage,
      ),
      title: 'My Account',
    },
    {
      path: 'change-password',
      loadComponent: () => import('./profile/pages/change-password-page/change-password-page').then(
        (m) => m.ChangePasswordPage,
      ),
      title: 'Change Password',
    },
  ],
}
```

Important routing behavior:

- `/profile` redirects to `/profile/account`.
- `/profile/account` renders the account details form.
- `/profile/change-password` renders the password form.
- `authGuard` protects the whole profile route tree.
- If no token exists, `authGuard` returns a URL tree to `/auth/login`.

## High-Level Architecture

The profile feature is split into three layers:

| Layer | Responsibility |
| --- | --- |
| Feature components | Render profile pages, manage form state, call `AuthService`, show toasts/errors. |
| Shared auth library | Owns API calls, authentication signals, local/session/cookie persistence, DTO mapping. |
| Shared UI library | Provides reusable UI atoms/molecules such as avatar upload, inputs, form fields, buttons, and toast. |

The feature uses Angular standalone components, reactive forms, Angular signals, RxJS, Tailwind utility classes, and Lucide icons.

## Components

### `ProfileLayout`

File: `apps/shop/src/app/features/profile/pages/profile-layout/profile-layout.ts`

Responsibilities:

- Provides the page shell for all profile child routes.
- Renders the page title: `Update Profile`.
- Renders `ProfileSidebar`.
- Renders child pages through `router-outlet`.
- Handles logout.

Logout flow:

1. User clicks `Logout` in the sidebar.
2. `ProfileSidebar` emits `logout`.
3. `ProfileLayout.handleLogout()` sets `isLoggingOut` to `true`.
4. `AuthService.logout()` calls `GET /auth/logout`.
5. On success, auth state is cleared by `AuthService.clearAuth()`.
6. User is navigated to `/auth/login`.
7. On error, a toast shows `Something went wrong. Try again later.`

UI notes:

- Layout is vertical on small screens.
- Layout switches to sidebar + content on large screens.
- Sidebar height is fixed to `720px` on large screens.
- Content is placed in a flexible outlet container.

### `ProfileSidebar`

File: `apps/shop/src/app/features/profile/components/profile-sidebar/profile-sidebar.ts`

Responsibilities:

- Shows profile navigation links.
- Emits logout intent to the layout.
- Shows the logout loading label.

Navigation items:

| Label | Route | Icon |
| --- | --- | --- |
| My Account | `/profile/account` | `UserRoundPen` |
| Change Password | `/profile/change-password` | `LockKeyhole` |

UI behavior:

- Uses `routerLinkActive` to highlight the active route.
- Uses horizontal scrolling navigation on small screens.
- Uses vertical sidebar navigation on large screens.
- Logout button is disabled while `isLoggingOut` is true.

### `AccountPage`

File: `apps/shop/src/app/features/profile/pages/account-page/account-page.ts`

Responsibilities:

- Loads the user's latest profile data.
- Displays and validates account fields.
- Lets the user select a local avatar image.
- Saves changed profile fields.
- Uploads the selected photo.
- Deletes the user account after confirmation.

Form controls:

| Control | Editable | Validation |
| --- | --- | --- |
| `firstName` | Yes | Required, minimum 2 characters |
| `lastName` | Yes | Required, minimum 2 characters |
| `email` | No API update in this page | Required, email format |
| `phone` | Yes | Required, Egyptian mobile number |
| `gender` | No | Disabled display field |

The email field is rendered as an enabled form control, but it is not included in the update payload. The current update adapter only sends `firstName`, `lastName`, and `phone` to the backend.

Signals:

| Signal | Purpose |
| --- | --- |
| `isLoading` | Tracks profile data loading. |
| `isSaving` | Tracks profile save/photo upload. |
| `isDeleting` | Tracks account deletion. |
| `loadError` | Stores profile loading error text. |
| `submitError` | Stores save error text. |
| `uploadError` | Stores selected image validation errors. |
| `selectedPhoto` | Stores the selected `File` until save. |
| `user` | References `AuthService.currentUser`. |
| `profilePhoto` | Computes current avatar URL. |
| `fullName` | Computes current first + last name for avatar alt text and initials. |

Initial load flow:

1. `ngOnInit()` reads `AuthService.currentUser()`.
2. If cached user data exists, the form is patched immediately for fast display.
3. `loadProfile()` calls `AuthService.getLoggedUserData()`.
4. The API response is mapped through `AuthAdapter.fromUserResponseDto()`.
5. `AuthService.setUser()` stores the fresh user in local storage and updates `currentUser`.
6. `AccountPage.patchForm()` updates the form with fresh values.

Save flow:

1. User clicks `Save Changes`.
2. If the form is invalid or the avatar has a validation error, all controls are marked as touched and no API call is made.
3. The form value is normalized:
   - `firstName` and `lastName` are trimmed.
   - `phone` is converted to Egyptian international format: `+20xxxxxxxxxx`.
4. `hasEditableProfileChanges()` compares the payload against `AuthService.currentUser()`.
5. If editable fields changed, `AuthService.editProfile(payload)` is called.
6. If editable fields did not change, the profile update API is skipped.
7. If a photo is selected, `AuthService.uploadProfilePhoto(photo)` is called after the profile update step.
8. After photo upload, the page attempts `AuthService.getLoggedUserData()` to refresh the user data.
9. If the refresh call fails, the uploaded user response is kept as the fallback state.
10. On success, the selected photo state is cleared and a success toast is shown.
11. On error, `submitError` shows a backend message if available, otherwise a fallback message.

Delete account flow:

1. User clicks `Delete My Account`.
2. Browser `confirm()` asks: `Are you sure you want to delete your account? This action cannot be undone.`
3. If cancelled, no API call is made.
4. `AuthService.deleteAccount()` calls `DELETE /auth/deleteMe`.
5. On success, `AuthService.clearAuth()` removes token/user state.
6. A success toast is shown.
7. User is navigated to `/auth/register`.
8. On error, an error toast is shown.

Phone normalization:

The account page stores and displays phone numbers as local Egyptian mobile numbers, but sends international format to the API.

Accepted user input formats are normalized by removing non-digits and stripping known country prefixes:

| Input example | Local value | API payload |
| --- | --- | --- |
| `01012345678` | `1012345678` | `+201012345678` |
| `201012345678` | `1012345678` | `+201012345678` |
| `00201012345678` | `1012345678` | `+201012345678` |
| `1012345678` | `1012345678` | `+201012345678` |

Valid local Egyptian mobile format:

```text
^1[0125]\d{8}$
```

That means the local number must:

- Start with `10`, `11`, `12`, or `15`.
- Contain exactly 10 digits.

### `ChangePasswordPage`

File: `apps/shop/src/app/features/profile/pages/change-password-page/change-password-page.ts`

Responsibilities:

- Displays password change form.
- Validates old password, new password, and confirmation.
- Calls the backend change-password endpoint.
- Shows success and error feedback.

Form controls:

| Control | Validation |
| --- | --- |
| `oldPassword` | Required |
| `newPassword` | Required, minimum 8 characters |
| `confirmPassword` | Required, must match `newPassword` |

Password update flow:

1. User submits the form.
2. If invalid, all controls are marked as touched.
3. `{ oldPassword, newPassword }` is sent to `AuthService.changePassword()`.
4. Backend receives `PATCH /auth/change-password`.
5. On success, the form is reset and a success toast is shown.
6. On error, the page shows the backend message if available, otherwise `Could not change your password. Try again later.`

## Shared Auth Logic

File: `libs/shared/auth/src/lib/data-access/auth.service.ts`

Profile-related methods:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `getLoggedUserData()` | `GET /auth/profile-data` | Fetch current authenticated user data. |
| `editProfile(data)` | `PUT /auth/editProfile` | Update editable profile fields. |
| `uploadProfilePhoto(file)` | `PUT /auth/upload-photo` | Upload avatar image as `FormData`. |
| `changePassword(data)` | `PATCH /auth/change-password` | Change account password. |
| `deleteAccount()` | `DELETE /auth/deleteMe` | Delete current account and clear local auth state. |
| `logout()` | `GET /auth/logout` | Logout and clear local auth state. |

State owned by `AuthService`:

| State | Storage | Description |
| --- | --- | --- |
| `currentUser` | Angular signal + `localStorage.auth_user` | Current user profile data. |
| `token` | Angular signal + cookie or `sessionStorage.auth_token` | Current authentication token. |
| `isAuthenticated` | Computed signal | True when a token exists. |

Token behavior:

- Remember-me login stores the token in a cookie for 7 days.
- Non-remember-me login stores the token in session storage.
- User data is stored in local storage.
- `clearAuth()` removes local storage, session storage, cookie token, and resets signals.

HTTP behavior:

- `jwtInterceptor` adds `Authorization: Bearer <token>` when a token exists.
- `errorInterceptor` clears auth and navigates to `/auth/login` on `401` for protected endpoints.

## DTO Mapping

File: `libs/shared/auth/src/lib/models/auth.models.ts`

The frontend uses a normalized `User` model:

```ts
export interface User extends BaseUser {
  id: string;
  role: 'user' | 'admin';
}
```

The backend DTO uses `_id` and a string role:

```ts
export interface UserDto extends BaseUser {
  _id: string;
  role: string;
  gender: string;
  wishlist: unknown[];
  addresses: unknown[];
  createdAt: string;
}
```

Mapping rules:

- `_id` becomes `id`.
- Any non-`admin` role becomes `user`.
- `photo`, `gender`, `phone`, `email`, `firstName`, and `lastName` pass through.
- `UserResponseDto` can be either a raw user DTO or `{ user: UserDto }`.
- Upload photo response can be:
  - full auth response with token,
  - raw user response,
  - wrapped user response,
  - photo-only response.

Edit profile mapping:

```ts
static toEditProfileDto(user: Partial<BaseUser>): Partial<BaseUser> {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  };
}
```

This means profile editing currently does not send `email`, `gender`, or `photo` through the edit-profile endpoint. Photo has its own upload endpoint.

## Avatar Upload UI

File: `libs/shared/ui/src/lib/components/molecules/avatar-upload/avatar-upload.ts`

Inputs:

| Input | Purpose |
| --- | --- |
| `imageUrl` | Current persisted profile photo URL. |
| `userName` | Used for image alt text and initials fallback. |
| `disabled` | Disables avatar interactions while loading/saving. |

Outputs:

| Output | Purpose |
| --- | --- |
| `fileSelected` | Emits the selected `File` or `null`. |
| `validationFailed` | Emits an error message or `null`. |

Validation:

- Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`.
- Maximum file size: `5MB`.

Preview behavior:

- Valid local files create an object URL with `URL.createObjectURL()`.
- Previous preview URLs are revoked before replacing them.
- Preview URLs are revoked on component destroy.
- If no image exists, initials are generated from the first two words of `userName`.
- If no initials are available, fallback is `U`.

## UI Specification

Profile layout:

- Main section uses a top/bottom padded column layout.
- Title is large and bold:
  - `40px` on default screens.
  - `48px` on `sm` and above.
- Body is stacked on mobile and row-based on large screens.

Sidebar:

- Background: `#fafafa`.
- Border: `#f4f4f5`.
- Active item: background `#27272a`, text `#fafafa`.
- Normal item text: `#27272a`.
- Logout text: `#cd2e33`.
- Icons come from `lucide-angular`.

Forms:

- Inputs use `49px` height.
- Input border color: `#d4d4d8`.
- Focus ring color: `#a6252a`.
- Primary action background: `#a6252a`.
- Primary action hover: `#741c21`.
- Error text color: `#A6252A`.
- Error alert uses light red background and border.

Account page layout:

- Avatar upload is placed above account fields.
- First name and last name are side-by-side from `md` and above.
- Phone input has a fixed `EG(+20)` prefix.
- Delete action is left-aligned on desktop and appears below the save button on small screens because of `flex-col-reverse`.
- Save button is right-aligned on larger screens.

Change password page layout:

- Old password appears first.
- A horizontal divider separates old password from new password fields.
- Submit button is right-aligned.

## Error Handling

Profile page errors are handled locally:

- Load failure sets `loadError`.
- Save failure sets `submitError`.
- Photo validation failure sets `uploadError`.
- Delete failure shows a toast error.
- Logout failure shows a toast error.
- Password change failure sets `submitError`.

Backend error message extraction follows this shape:

```ts
if (typeof error === 'object' && error && 'error' in error) {
  const response = (error as { error?: { message?: string } }).error;
  return response?.message || fallback;
}
```

If the backend does not provide `error.message`, the UI shows a page-specific fallback.

## Loading And Disabled States

| Action | State | UI effect |
| --- | --- | --- |
| Load profile | `isLoading` | Avatar is disabled; save button disabled. |
| Save profile/photo | `isSaving` | Avatar disabled; save button loading; delete disabled. |
| Delete account | `isDeleting` | Delete label changes to `Deleting account...`; delete disabled. |
| Logout | `isLoggingOut` | Logout label changes to `Logging out...`; logout disabled. |
| Change password | `isSubmitting` | Submit button shows loading. |

## API Contract Summary

Base URL comes from `APP_CONFIG.apiUrl`.

| Operation | Method | Path | Request | Response |
| --- | --- | --- | --- | --- |
| Get profile data | `GET` | `/auth/profile-data` | Bearer token | `UserDto` or `{ user: UserDto }` |
| Edit profile | `PUT` | `/auth/editProfile` | `{ firstName, lastName, phone }` | `UserDto` or `{ user: UserDto }` |
| Upload photo | `PUT` | `/auth/upload-photo` | `FormData` with `photo` | Auth response, user response, or photo response |
| Change password | `PATCH` | `/auth/change-password` | `{ oldPassword, newPassword }` | `{ message }` |
| Delete account | `DELETE` | `/auth/deleteMe` | Bearer token | `{ message }` |
| Logout | `GET` | `/auth/logout` | Bearer token | `{ message }` |

## Extension Notes

When adding or changing profile behavior:

- Keep API paths in `libs/shared/util/src/lib/constants/endpoints.const.ts`.
- Keep backend-to-frontend mapping in `AuthAdapter`.
- Do not bind UI directly to backend DTO shapes.
- Update `toEditProfileDto()` if the backend starts accepting more editable fields.
- Keep photo upload separate unless the backend API changes.
- Prefer Angular reactive form validators for client-side validation.
- Use `AuthService.currentUser` for app-wide user display updates.
- Ensure any successful profile mutation calls `setUser()` or refreshes user data.
- Use `npm exec nx ...` commands for build, test, lint, and project tasks.

## Known Implementation Details

- `email` is visible and validated but is not included in the edit-profile payload.
- `gender` is displayed in a disabled input and is not editable.
- Profile photo selection is only persisted after pressing `Save Changes`.
- If profile fields are unchanged but a photo is selected, only the upload-photo API is called.
- If no editable fields and no photo changed, the current implementation still shows a success toast after submit.
- Account deletion navigates users to `/auth/register`, while logout navigates to `/auth/login`.
