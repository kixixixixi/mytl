# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyTL is a Next.js 16 React application for creating and sharing personal timelines. The application is designed for Japanese users and uses static export for deployment.

## Development Commands

```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format with Prettier
pnpm typecheck          # Run TypeScript compiler check
```

## Architecture

**Framework Stack:**
- Next.js 16 with App Router architecture
- React 19 with TypeScript
- Static export configuration for deployment
- Production deployment to `/mytl` base path

**Project Structure:**
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- Uses Japanese locale (`ja`) as default language

**Key Configuration:**
- Static export enabled (`output: "export"`)
- Image optimization disabled (static deployment)
- Base path configured for `/mytl` in production
- ESLint flat config with React, TypeScript, and accessibility rules

## Current Implementation Notes

The project is in early development:
- Custom `Chrono` timeline component implemented (no external library dependency)
- Timeline functionality uses mock WWII historical data
- Supports both point-in-time events and date ranges
- Core timeline creation and sharing features are not yet implemented

## Development Workflow

When implementing timeline features:
1. Use the custom `Chrono` component in `components/chrono.tsx`
2. Replace mock data with user-generated timeline data
3. Implement data persistence and sharing functionality

Always run `pnpm typecheck` and `pnpm lint` before committing changes.

## Styling Guidelines

**CSS Implementation:**
- Use inline styles with React's `style` prop instead of external CSS files or CSS-in-JS
- Sort CSS properties alphabetically for consistency and readability
- Prefer inline styles for component-specific styling to avoid CSS conflicts
- Use conditional styling based on component props and state

**Example:**
```tsx
<div
  style={{
    backgroundColor: theme.primary,
    borderRadius: "8px",
    padding: "20px",
    position: "relative"
  }}
>
```

This approach ensures styles are scoped to components and eliminates the need for external CSS dependencies in static deployments.