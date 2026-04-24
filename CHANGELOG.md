# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-04-24

### Added
- **Helmet.js** — 15+ security headers (CSP, HSTS, X-Frame-Options, etc.) applied globally via `main.ts`
- **Rate limiting** (`@nestjs/throttler`) — per-endpoint throttle guards on all auth and user routes (register: 10/min, login: 10/min, forgot-password: 5/min, reset-password: 5/min)
- **CORS hardening** — `app.enableCors()` with an origin allowlist driven by the `ALLOWED_ORIGINS` env var (comma-separated). Credentials and standard HTTP methods enabled. CORS is disabled entirely when `ALLOWED_ORIGINS` is unset (e.g. private/internal APIs)
- **Request body size limit** — `body-parser` JSON and URL-encoded middleware capped at 10 mb to prevent large-payload DoS attacks
- **`tsBuildInfoFile`** in `tsconfig.json` — incremental TypeScript cache now lives inside `dist/` so `rimraf dist` always produces a clean, correct build
- **Biome `assist` config** — `organizeImports` enabled via the Biome v2 `assist.actions.source` API; replaces the v1 `organizeImports` top-level key
- **Unified user DTOs** — `user.request.ts` and `user.response.ts` consolidate all request/response shapes for the user module
- **`change-password` endpoint** (`PATCH /users/change-password`) — lets authenticated users change their password with current-password verification
- **`delete-me` endpoint** (`DELETE /users/me`) — lets authenticated users permanently delete their own account
- **New env vars** — `ALLOWED_ORIGINS`, `JWT_FORGOT_PASSWORD_TOKEN_SECRET`

### Changed
- **BREAKING:** Removed `crud-sample` module — the generic CRUD scaffold has been removed; use the user module as a reference instead
- **BREAKING:** User DTO structure reorganised — `create-user.request.ts`, `login.request.ts`, `create-user.response.ts` replaced by unified `user.request.ts` / `user.response.ts`
- `user.controller.ts` fully rewritten — cleaner route grouping (registration/login, password reset flow, own profile, admin), Zod response types on every endpoint
- `user.service.ts` expanded — dedicated methods for `getMe`, `updateMe`, `deleteMe`, `changePassword`, `findAll`, `findById`
- `auth.controller.ts` simplified — login swagger inline, removed separate swagger file
- `app.module.ts` updated to remove crud-sample module

### Fixed
- TypeScript incremental build silently skipping emit when `dist/` was deleted but `.tsbuildinfo` remained — fixed by co-locating the cache file inside `dist/`
- Biome v2 warning `organizeImports` not allowed at top level — migrated to `assist.actions.source.organizeImports`

## [2.0.0] - 2025-12-01

### Added
- **Role-Based Access Control (RBAC)** - Granular permission system with `@AccessTo()` decorator
- `Role` enum with `ADMIN` and `STANDARD` roles
- `@AccessTo()` decorator for restricting routes to specific roles
- `@IsPublic()` decorator for bypassing authentication on specific routes
- Global `AccessTokenGuard` for automatic route protection
- User role field in database schema

### Changed
- **BREAKING:** Upgraded Prisma from 4.x to 6.x
- Updated `AccessTokenGuard` to handle both authentication and authorization
- User model now includes `role` field with default value `STANDARD`
- Login and register responses now include user role

### Fixed
- JWT secret mismatch between token signing and verification
- Swagger bearer auth configuration for protected endpoints

## [1.0.0] - 2025-11-17

### Added
- User registration API endpoint (`POST /users`)
- Zod validation for request DTOs with comprehensive password complexity requirements
- Swagger/OpenAPI documentation with auto-generated schemas
- Prisma ORM integration with PostgreSQL
- User model with timestamps (createdAt, updatedAt)
- Docker Compose setup for PostgreSQL database
- Environment variable configuration with type-safe exports
- Reusable Swagger decorator patterns for clean controller code
- TypeScript path aliases (@src, @user, @auth, @configs, @middleware)

### Changed
- **BREAKING:** Upgraded NestJS from 9.x to 11.x
- **BREAKING:** Upgraded TypeScript to 5.3.3
- **BREAKING:** Changed module resolution from "bundler" to "node" in tsconfig
- Updated Docker configuration for better development workflow
- Improved TypeScript configuration for CommonJS compatibility
- Refactored project structure with modular organization
- Enhanced error handling and validation responses

### Fixed
- Docker container nested path issues in build output
- CommonJS vs ESM module resolution conflicts
- TypeScript compiler options for NestJS compatibility
- PostgreSQL connection issues with Docker networking

### Infrastructure
- docker-compose.yml for local development
- Configured Prisma migrations workflow

### Developer Experience
- Added comprehensive npm scripts for common tasks
- Better error messages with Zod validation
- Interactive API documentation with Swagger UI

## [0.2.0] - 2025-11-13

### Fixed
- Fixed logger initialization and configuration

### Improved
- Added nest-winston logging setup for better application startup visibility

## [0.1.0] - 2025-11-12

### Changed
- Migrated from ESLint and Prettier to Biome
- Updated tsconfig.json to use `paths` instead of deprecated `baseUrl`

### Added
- New npm scripts: `format`, `lint`, `lint:fix`, `check:fix`
- Biome configuration with TypeScript and test environment support

### Removed
- ESLint configuration files
- Prettier configuration files

## [0.0.1] - [2025-09-04]

### Added
- Initial boilerplate release