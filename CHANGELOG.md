# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-11-17

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

## [0.2.0] - 2024-11-13

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