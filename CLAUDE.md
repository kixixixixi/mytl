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
- `ChronoView` component references a `<Chrono>` component that needs implementation
- Timeline functionality uses mock WWII historical data
- No timeline library is currently installed (consider `react-chrono` or similar)
- Core timeline creation and sharing features are not yet implemented

## Development Workflow

When implementing timeline features:
1. Install a timeline library (likely `react-chrono` based on component naming)
2. Complete the `Chrono` component implementation in `components/`
3. Replace mock data with user-generated timeline data
4. Implement data persistence and sharing functionality

Always run `pnpm typecheck` and `pnpm lint` before committing changes.