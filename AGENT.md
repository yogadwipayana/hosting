# Frontend Development Guidelines for AI Agents

## Tech Stack Overview

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- **Routing**: React Router v7
- **State Management**: React hooks (useState, useEffect, useContext)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Analytics**: Microsoft Clarity

## Project Structure

```
frontend/
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── components/     # Reusable components
│   │   └── ui/        # shadcn/ui components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── App.jsx        # Main app with routing
├── public/            # Public static files
└── index.html         # Entry HTML
```

## Development Rules

### 1. Component Standards

- Use functional components with hooks
- Place reusable components in `src/components/`
- Use shadcn/ui components via CLI: `npx shadcn add <component>`
- Follow shadcn/ui patterns for new components

### 2. Styling Guidelines

- Use Tailwind CSS v4 syntax
- Use CSS variables from `src/index.css` for theming
- Support dark mode (check `.dark` class)
- Color system uses OKLCH format
- Use `cn()` utility from `@/lib/utils` for conditional classes

### 3. Import Conventions

- Use path alias `@/` for all imports
- Examples:
  ```jsx
  import { Button } from "@/components/ui/button";
  import { useClarity } from "@/hooks/useClarity";
  import { cn } from "@/lib/utils";
  ```

### 4. Routing

- Define routes in `App.jsx`
- Use React Router v7 syntax
- Lazy load pages when appropriate

### 6. API Integration

- Use Axios for HTTP requests
- Create API clients in `src/lib/api.js`
- Handle loading and error states

### 7. Code Quality

- ESLint configured with React hooks and refresh rules
- Run `npm run lint` before committing
- Use JSDoc for hook documentation

### 8. Available shadcn/ui Components

Install via CLI when needed:

- Button, Card, Input, Dialog
- Tooltip, Separator, Slot
- And others from registry

### 9. Custom Hooks

- Document with JSDoc
- Place in `src/hooks/`
- Export named exports

### 10. Build & Deploy

- Build: `npm run build`
- Preview: `npm run preview`
- Docker support with nginx

## Quick Commands

```bash
# Install shadcn component
npx shadcn add button

# Run dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## File Templates

### New Component

```jsx
import { cn } from "@/lib/utils";

export function ComponentName({ className, ...props }) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### New Page

```jsx
import { Helmet } from "react-helmet-async";

export default function PageName() {
  return (
    <>
      <Helmet>
        <title>Page Title</title>
      </Helmet>
      <div>{/* page content */}</div>
    </>
  );
}
```

### New Hook

```jsx
import { useEffect, useState } from "react";

/**
 * Hook description
 * @param {type} param - description
 * @returns {type} description
 */
export function useHookName(param) {
  // implementation
  return value;
}
```

## Common Patterns

1. **Conditional Classes**: Use `cn()` from `@/lib/utils`
2. **Theme Colors**: Reference CSS variables (`bg-background`, `text-foreground`)
3. **Icons**: Use Lucide React icons
4. **Analytics**: Clarity auto-tracks; use `window.clarity()` for custom events
5. **Responsive**: Use Tailwind breakpoints (sm, md, lg, xl)

## Notes

- React 19 is used - leverage new features when beneficial
- Tailwind v4 uses `@theme` instead of `tailwind.config.js`
- Components are styled with New York style (clean, minimal)
- Always check dark mode compatibility
- **SEO Best Practices**: Use semantic HTML tags, include meta tags with react-helmet-async, ensure proper heading hierarchy (h1 → h2 → h3), add alt text to images, use descriptive URLs, implement proper Open Graph tags
- **Clean Code**: Keep components small and focused, use meaningful variable names, avoid prop drilling (use context when needed), extract complex logic into hooks, follow DRY principle, write self-documenting code with minimal comments needed
