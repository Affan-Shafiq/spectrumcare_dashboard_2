# Landing Page Integration & Routing Guide

This document explains the intended architecture for integrating the landing page with the existing SpectrumDash Admin Dashboard.

## Architecture Overview

The application is designed to be a single deployment where:
- The **Landing Page** serves as the root entry point (`/`).
- The **Admin Dashboard** and its features are accessible via sub-routes (e.g., `/login`, `/dashboard`).

## Current State

The dashboard's core routing logic is contained in `src/App.tsx`. Currently, it handles:
1. **Authentication State**: Checking for valid tokens and Firebase Auth state.
2. **Conditional Routing**: 
   - Unauthenticated users are currently restricted to the `/` (Login) route.
   - Authenticated users are directed to the `/dashboard` and other admin routes.

## Integration Strategy

To integrate the landing page while maintaining the current dashboard functionality, follow these steps:

### 1. Update Root Route in `App.tsx`
The root path `/` currently points to the `LoginPage`. You should move the `LoginPage` to a dedicated route (e.g., `/login`) and set the root path to the `LandingPage`.

### 2. Handle Navigation
- Add "Login" or "Dashboard" buttons to the Landing Page `Navbar` and `Hero` sections.
- These buttons should link to `/login` (if unauthenticated) or directly to `/dashboard` (if already logged in).

### 3. Recommended Route Structure
Modify the `Routes` block in `App.tsx` to look something like this:

```tsx
{!isAuth ? (
  <Routes>
    {/* Entry point is now the landing page */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
) : (
  <AdminLayout onLogout={handleLogout}>
    <Routes>
      {/* Landing page still accessible even when logged in if desired */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardHome />} />
      {/* ... other admin routes ... */}
    </Routes>
  </AdminLayout>
)}
```

### 4. Style Consistency
The landing page components in `src/landing/` use the project's Tailwind configuration and design tokens (e.g., `spectrum-primary`). Ensure any new styles added maintain the "premium" aesthetic established in the boilerplate.

## Development Rules
- **Do Not** modify the core authentication logic in `authService.ts` unless necessary for the landing page.
- **Keep Landing Styles Isolated**: Use `src/landing/landing.css` for landing-specific animations to avoid polluting the global CSS.
- **Responsive Design**: Ensure any additions to the landing page remain fully responsive across mobile, tablet, and desktop views.

---

*Note: This boilerplate was created to provide a starting point for the landing page development without disrupting the ongoing dashboard work.*
