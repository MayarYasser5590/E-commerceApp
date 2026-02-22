# 🔐 Authentication Module

Reusable components, validation utilities, and shared services for forget password flow:

> **Forgot Password → OTP Verification → Reset Password**

---

## 📦 Reusable Components

### 🧩 Auth Form Header Molecule

Reusable header component for authentication flows.\
Displays a **title** and an optional **description**.

#### Example

```html
<lib-auth-form-header-molecule title="Create a new password" description="Set a strong password to secure your account."> </lib-auth-form-header-molecule>
```

---

## ✅ Form Validators & Error Helpers

Utilities used to validate authentication form inputs.

---

### 🔑 Password Regex Pattern

```ts
export const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
```

#### Password Requirements

- Minimum **8 characters**
- At least **1 uppercase** letter\
- At least **1 lowercase** letter\
- At least **1 number**\
- At least **1 special character** (`#?!@$%^&*-`)

---

### 🧪 Validation Helpers

#### `getNewPasswordError(control: AbstractControl): string | null`

```ts
const error = getNewPasswordError(form.controls.newPassword);

- `'Password is required'` → if empty\
- `'Password must be at least 8 characters and include ...'` → if pattern fails\
- `null` → if valid
```

---

#### `getConfirmPasswordError(control: AbstractControl): string | null`

```ts
const error = getConfirmPasswordError(form.controls.confirmPassword);
-   `'Confirm password is required'` → if empty\
-   `'Passwords do not match'` → if mismatch\
-   `null` → if valid
```

---

## 🔁 Services

### 📧 EmailService

Used to store and share the user's email across the authentication flow:

> **Forgot Password → OTP → Reset Password**

### Email Service

| Method          | Description                |
| --------------- | -------------------------- |
| setEmail(email) | Sets the current email     |
| clear()         | Clears the stored email    |
| email           | Read-only signal for email |

### Example Usage

```ts
this.emailService.setEmail(email);
const email = this.emailService.email();
this.emailService.clear();
```

---

## 🧱 Flow Components

| Component                 | Responsibility                |
| ------------------------- | ----------------------------- |
| ResetPasswordFeature      | Main reset password flow      |
| ResetPasswordOrganism New | password form                 |
| VerifyOtpCodeFeature OTP  | verification flow             |
| VerifyOtpFormOrganism OTP | input form + resend countdown |

---

| util                             | Purpose                                  |
| -------------------------------- | ---------------------------------------- |
| PASSWORD_PATTERN                 | Regex for password                       |
| getNewPasswordError(control)     | Returns error for new password field     |
| getConfirmPasswordError(control) | Returns error for confirm password field |
