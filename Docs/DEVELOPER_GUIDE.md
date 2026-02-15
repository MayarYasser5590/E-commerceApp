# 💁‍♂️ Developer Quick Guide

Welcome to the team! This is a simple guide to help you understand how our project is built and how to work on it efficiently.

---

## 🏗️ The Project Structure

We use **Nx**, which splits the project into two main parts:

### 1. Apps (`apps/`) - The "Boxes"

Apps are the final products we ship to users. They are mostly **empty shells** that combine different libraries.

- **Responsibility**: Orchestration, top-level routing, and global configuration.
- **shop**: The website customers see.
- **admin**: The dashboard for our staff.

### 2. Libs (`libs/`) - The "Building Blocks"

**95% of your work happens here.** Each library is a small, reusable piece of the system.

- **Features**: A whole page (e.g., Home Page).
- **UI**: Small visual pieces (e.g., a Button or a Header).
- **Data-Access**: Code that talks to the database/API.
- **Util**: Helper functions.
- **Models**: TypeScript interfaces/types.

---

## 🛡️ Coding Rules (Boundaries)

To keep the code clean, we have strict rules:

- **Shop code** stays in Shop.
- **Admin code** stays in Admin.
- **Shared code** (in `libs/shared`) can be used by **everyone**.

> [!TIP]
> If you try to import Admin code into the Shop app, the **Lint** command will show an error. This prevents accidental bugs!

---

## 📦 How to Install Packages (NPM)

We use a **Single package.json** at the root of the project.

1.  **Always install in the root folder**:
    ```bash
    npm install [package-name]
    ```
2.  **Usage**: Once installed, you can `import` it anywhere in the project (any app or library).
3.  **Why?**: This ensures every app uses the **same version** of a tool (like Angular or Lodash).

---

## 🛠️ Daily Workflow

### Most Used Commands

| Task                 | Command                                  |
| :------------------- | :--------------------------------------- |
| **Run Shop**         | `npx nx serve shop`                      |
| **Run Admin**        | `npx nx serve admin`                     |
| **Check for Errors** | `npx nx run-many -t lint`                |
| **New Library**      | `npx nx g @nx/angular:lib --name=my-lib` |

---

## 🔐 Authentication & Roles

We have a built-in Auth system in `libs/shared/auth`.

- **AuthService**: Uses **Angular Signals**. You can check `authService.isAuthenticated()` or `authService.currentUser()` anywhere.
- **Roles**: There are two roles: `'customer'` and `'admin'`.
- **Protecting Routes**: Use `authGuard` in your `app.routes.ts`:
  ```typescript
  {
    path: 'admin-dashboard',
    canActivate: [authGuard(['admin'])], // Only admins allowed
  }
  ```

---

## 🌍 Environment Configuration

We use specialized environment files for each app to handle API URLs and production flags.

- **Files**: Found in `apps/[app-name]/src/environments/`.
  - `environment.ts`: Development settings.
  - `environment.prod.ts`: Production settings.
- **How to use**: We use the `APP_CONFIG` injection token from `@shop-workspace/shared-util`.
  ```typescript
  // In your service
  private config = inject(APP_CONFIG);
  apiUrl = this.config.apiUrl;
  ```
- **Automatic Switching**: Nx is configured in `project.json` to automatically swap to the `.prod.ts` file when you run a production build (`nx build --prod`).

---

## 📂 Quick Map (Folder Structure)

| Folder               | What’s inside?           | Who uses it? |
| :------------------- | :----------------------- | :----------- |
| **apps/shop**        | Customer Website (Shell) | —            |
| **apps/admin**       | Staff Dashboard (Shell)  | —            |
| **libs/shop**        | Shop Logic & Pages       | Shop App     |
| **libs/admin**       | Admin Logic & Pages      | Admin App    |
| **libs/shared**      | Shared UI & Utils        | Everyone     |
| **libs/shared/auth** | Login & Security         | Everyone     |

---

## 📄 How to Save as PDF (Guaranteed Color)

If your current tool doesn't show the diagrams or colors correctly, use this method:

1.  **Open this file in your Browser** (Chrome or Edge).
2.  Press **Ctrl + P** (Print).
3.  Click **More Settings** -> CHECK **"Background graphics"**.
4.  Set Destination to **"Save as PDF"**.

---

_For any questions, ask the team lead! Happy coding!_
