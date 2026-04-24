# NestJS Boilerplate

## This boilerplate covers

- **NestJS 11** - Latest version with modern TypeScript support
- **Security hardening**
  - Helmet.js for HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.)
  - Rate limiting via `@nestjs/throttler` with per-endpoint overrides
  - CORS with environment-driven origin allowlist
  - Request body size cap (10 mb) to prevent large-payload DoS
- **JWT Token configuration**
  - Access & refresh tokens
  - Global authentication guard
- **Role-Based Access Control (RBAC)**
  - `@AccessTo()` decorator for role restrictions
  - `@IsPublic()` decorator for public routes
  - ADMIN and STANDARD roles
- **Docker & Docker Compose** - Containerized development environment
- **Prisma 6 ORM** - Type-safe database access with PostgreSQL
- **Zod Validation** - Runtime type validation with automatic Swagger schema generation
- **Biome (Linting & Formatting)** - Fast all-in-one toolchain with automatic import sorting
- **Swagger/OpenAPI Documentation** - Auto-generated API documentation with interactive UI
- **Winston Logger** - Structured logging with file and console outputs
- **Complete user management** - Register, login, profile, change password, delete account
- **Forgot Password** - Token-based password reset flow
- **Path Aliases** - Clean imports with `@src`, `@user`, `@auth`, etc.

## 🚀 Quick Start

### Prerequisites

- Node.js 22.13.0+
- Docker & Docker Compose
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone <repository-url>
cd nestjs-boilerplate

# 2. Copy environment file
cp .env.example .env

# 3. Start Docker containers
npm run container:init

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Access the application
API: http://localhost:3001
Swagger: http://localhost:3001/api/docs
```

## 🛠️ Tech Stack

| Technology     | Version | Purpose                |
| -------------- | ------- | ---------------------- |
| NestJS         | ^11.0.0 | Backend framework      |
| TypeScript     | ^5.9.3  | Type safety            |
| Prisma         | ^6.19.0 | ORM & migrations       |
| PostgreSQL     | 16      | Database               |
| nestjs-zod     | ^5.0.1  | Zod-NestJS integration |
| Passport       | 0.6.0   | Authentication         |
| nestjs/swagger | ^11.0.0 | API documentation      |
| Winston        | Latest  | Logging                |
| Biome          | Latest  | Linting & formatting   |
| Docker         | -       | Containerization       |

## File and folder naming conventions

- Classes and interfaces Names will be singular and follow `PascalCasing`
- Any global constants or environment variables are in `all-caps` and follow `SNAKE_CASE`
- Variable name should be `camelCase`
- Folder and file name will be singular and follow `kebab-case`
- Exceptions:
  - Module files should follow this pattern: `<name>.module.ts`
  - Controller files should follow this pattern: `<name>.controller.ts`
  - Service files should follow this pattern: `<name>.service.ts`

## Code Quality & Formatting

This boilerplate uses [Biome](https://biomejs.dev/) for both linting and formatting, providing a fast all-in-one toolchain.

### Configuration

- **biome.json**: Contains all linting and formatting rules
- **Key features**:
  - Automatic import sorting
  - Consistent code style (tabs, single quotes, semicolons)
  - TypeScript-first with parameter decorator support
  - Jest/Vitest test globals configured

### Available Commands
```bash
# Format code
npm run format

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint:fix

# Run both formatter + linter with auto-fix (recommended)
npm run check:fix
```

### VS Code Integration

Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for automatic formatting on save.

## Project directory structure

NestJS architecture is based on modules, controllers, and services. This boilerplate has the following structure:
```bash
src/
├── auth/                 # Authentication module
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   └── auth.controller.ts
├── user/                 # User module
│   ├── dto/             # Data transfer objects
│   │   ├── create-user.dto.ts
│   │   └── response/
│   │       └── user-response.dto.ts
│   ├── swagger/         # Swagger decorators
│   │   ├── create-user.swagger.ts
│   │   ├── get-users.swagger.ts
│   │   └── index.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.constants.ts
│   └── user.module.ts
├── prisma/              # Prisma service
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── configs/             # Configuration files
│   └── env-vars.ts      # Environment variables export
├── middleware/          # Custom middleware
├── common/              # Shared utilities
├── app.module.ts        # Main application module
└── main.ts              # Application entry point

prisma/
├── schema.prisma        # Database schema
└── migrations/          # Migration history

docker-compose.yml       # Docker configuration
Dockerfile              # Container build instructions
```

### Core Files

#### app.module.ts

- This is the most important file in this application. This module file essentially bundles all the controllers and providers of our application together.

#### app.controller.ts

- In this file you will find all the routes related to our application itself, like a `/health` route to check application status.

#### app.service.ts

- This service will include methods that will perform a certain operation. For example, a service to find all users.

#### main.ts

- The entry file of our application, here you find the configs for our server and application in general like CORS, ports, validation pipes, Swagger setup, and Winston logger configuration.

## Secret management

For store database configurations, JWT secrets and ports, this boilerplate uses a `.env` file with the following variables:
```env
# Server Configuration
PORT=3001

# Database Configuration
PORT_DATABASE=5433
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE_NAME=nestdb

# Database URL
# For host machine (migrations)
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nestdb?schema=public"

# JWT Tokens
JWT_ACCESS_TOKEN_SECRET="your-access-token-secret"
JWT_REFRESH_TOKEN_SECRET="your-refresh-token-secret"
```

> In this same project, there's a file called `.env.example` that we can use as an example to set a standard configuration into `.env` file.

### Environment Variables in Code

Environment variables are exported from `src/configs/env-vars.ts` for type-safe access throughout the application:
```typescript
import { PORT, PG_USER, DATABASE_URL } from '@configs/env-vars';
```

## 🐳 Docker Setup

### Docker Compose Services

The boilerplate includes:
- **PostgreSQL 16** - Database with persistent volumes
- **NestJS API** - Application with hot reload in development

### Docker Commands
```bash
# Start all services (PostgreSQL + API)
npm run container:init
# or
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Remove volumes (⚠️ deletes data)
docker-compose down -v

# Access API container shell
npm run container:run
# or
docker-compose exec api sh

# Access bash (if available)
npm run container:run:bash
```

### Database Connection

#### From Host Machine (DBeaver/pgAdmin)
- **Host:** localhost
- **Port:** 5432 (to avoid conflicts with local PostgreSQL)
- **Database:** nestdb
- **Username:** postgres
- **Password:** postgres

#### From Docker Container (API → Database)
- **Host:** db (service name)
- **Port:** 5432 (internal Docker network)

## 🗄️ Database & Migrations

### Prisma Commands
```bash
# Create and apply migration
npx prisma migrate dev --name add_feature

# Apply pending migrations (production)
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

### Migration Workflow

**Development:**
```bash
# 1. Update schema.prisma
# 2. Create migration
npx prisma migrate dev --name add_user_role

# 3. Migration is automatically applied
```

**Production:**
```bash
# Only apply pending migrations (safe, idempotent)
npx prisma migrate deploy
```

### Create a New Schema (Prisma)

Into the boilerplate, we have a file called `schema.prisma` in the `prisma/` folder. To add a new model:
```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  username  String   @unique @db.VarChar(50)
  email     String   @unique @db.VarChar(255)
  password  String   @db.VarChar(255)
  firstname String   @db.VarChar(50)
  lastname  String   @db.VarChar(50)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@index([username])
}

// Add your new model
model Post {
  id          String   @id @default(uuid())
  title       String
  description String
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  author      User     @relation(fields: [authorId], references: [id])
}
```

Then create and apply the migration:
```bash
npx prisma migrate dev --name add_post_model
```

## 📝 API Documentation with Swagger

### Access Swagger UI

- **Interactive UI:** http://localhost:3001/api/docs
- **JSON Schema:** http://localhost:3001/api/docs-json

### Swagger Configuration Pattern

Create reusable Swagger decorators for clean controllers:

**1. Create Swagger decorator file:**
```typescript
// src/user/swagger/create-user.swagger.ts
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UserResponseDto } from '@user/dto/response/user-response.dto';

export const CreateUserSwagger = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new user' }),
    ApiResponse({
      status: 201,
      description: 'User created successfully',
      type: UserResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data',
    }),
  );
```

**2. Use in controller:**
```typescript
// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserSwagger } from './swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  @Post()
  @CreateUserSwagger()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

### Swagger Setup

Make sure Swagger configuration is setup in `main.ts`:
```typescript
const config = new DocumentBuilder()
  .setTitle('NestJS Boilerplate API')
  .setDescription('The NestJS REST API backend framework')
  .setVersion('1.0')
  .addTag('Users')
  .addTag('Auth')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'refresh-token',
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

## ✅ Validation with Zod

This boilerplate uses **Zod** for runtime validation with automatic Swagger schema generation via `nestjs-zod`.

### Creating DTOs with Zod
```typescript
// src/user/dto/create-user.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain special character'),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string()
    .min(5)
    .max(50)
    .toLowerCase()
    .regex(/^[a-z0-9]+$/, 'Only lowercase letters and numbers'),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
```

### Password Requirements

Passwords must contain:
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

### Global Validation Setup

In `main.ts`:
```typescript
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable Zod validation globally
  app.useGlobalPipes(new ZodValidationPipe());
  
  // ... rest of setup
}
```

### Response DTOs

For response documentation, use plain classes with `@ZodResponse({type: UserResponseDto})`:
```typescript
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserResponseSchema = z.object({
	id: z.uuid().describe('User ID'),
	username: z.string().describe('Username'),
	email: z.email().describe('Email address'),
	firstname: z.string().describe('First name'),
	lastname: z.string().describe('Last name'),
	createdAt: z.string().describe('Creation timestamp'),
	updatedAt: z.coerce.string().describe('Last update timestamp'),
});

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
```

## 🔐 Authentication & Authorization

### Authentication Strategies

This boilerplate provides 3 authentication strategies with [Passport](https://docs.nestjs.com/security/authentication):

| Strategy          | Purpose                      | Usage                  |
| ----------------- | ---------------------------- | ---------------------- |
| **Local**         | Username/password validation | Login routes           |
| **Access Token**  | JWT-based route protection   | All protected routes   |
| **Refresh Token** | Obtain new tokens            | Token refresh endpoint |

### Role-Based Access Control (RBAC)

The boilerplate includes a complete RBAC system with the following roles:
```typescript
enum Role {
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}
```

### Decorators

| Decorator                        | Purpose                      | Example           |
| -------------------------------- | ---------------------------- | ----------------- |
| `@IsPublic()`                    | Skip authentication entirely | Login, Register   |
| `@AccessTo(Role.ADMIN)`          | Restrict to specific roles   | Admin-only routes |
| `@ApiBearerAuth('access-token')` | Enable Swagger auth UI       | Protected routes  |

### Usage Examples

**Public route (no authentication):**
```typescript
@IsPublic()
@Post('/login')
@UseGuards(LocalGuard)
async login(@Body() body: LoginPayloadDto) {
  // Anyone can access
}
```

**Authenticated route (any valid token):**
```typescript
@Get('/profile')
@ApiBearerAuth('access-token')
async getProfile(@Request() req) {
  // Any authenticated user can access
  return req.user;
}
```

**Role-restricted route:**
```typescript
@Get('/admin-dashboard')
@ApiBearerAuth('access-token')
@AccessTo(Role.ADMIN)
async adminDashboard() {
  // Only ADMIN role can access
}
```

**Multiple roles allowed:**
```typescript
@Get('/reports')
@ApiBearerAuth('access-token')
@AccessTo(Role.ADMIN, Role.STANDARD)
async getReports() {
  // Both ADMIN and STANDARD roles can access
}
```

### How It Works

1. `AccessTokenGuard` is registered globally via `APP_GUARD`
2. Every request passes through the guard
3. Guard checks for `@IsPublic()` → skips auth if present
4. Guard validates JWT token → attaches user to request
5. Guard checks `@AccessTo()` roles → allows/denies based on user role

### Testing Protected Routes in Swagger

1. Call `/users/login` to get your `access_token`
2. Click the **"Authorize"** button (lock icon) in Swagger UI
3. Paste your token in the `access-token` field
4. Click **"Authorize"** → **"Close"**
5. Now all protected routes will include your token
## 🛣️ Adding a New Route to Your API

Into the controller of your API, add a function with the following decorators:

- HTTP Method (Required)
- Swagger Configuration (Optional)
- UseGuards (Optional)

**Basic route example:**
```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserSwagger } from './swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  @Post()
  @ZodResponse({type: UserResponseDto})
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

> For use services in controllers, we have to inject them through the constructor of the controller class


## 🔑 Forgot Password

The forgot password logic consists of two steps:

**1. Request Password Reset Token**

Send a GET HTTP request to `/forgot-password` passing the username in the body:
```http
GET /forgot-password
Content-Type: application/json

{
  "username": "admin"
}
```

For this example, this route will retrieve the token right away, but in a real case we have to create logic for the user to confirm their account with an email or other verification method.

**2. Update Password with Token**

With the `forgot_password_token`, send a PATCH HTTP request to `/update-password` passing the desired new password:
```http
PATCH /update-password
Content-Type: application/json
Authorization: Bearer <forgot_password_token>

{
  "password": "NewSecurePass123!"
}
```

If the token is valid, the password will be updated.

## 📋 Commit Rules

This project follows the Conventional Commits specification for creating standardized commit messages in our Git repository. This means that each commit message is structured in a consistent way, using a type, an optional scope, and a subject.

**Example:**
```
<type>[optional scope]: <description>

git commit -m "feat: create users endpoint"
```

**Common types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

*Commits without this pattern will be blocked by Husky.*

More information at: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

## 🚀 Available Commands

### Development
```bash
# Start development server (Docker)
npm run container:init

# Start development server (local)
npm run start:dev

# Start with debugging
npm run start:debug

# Build for production
npm run build

# Start production server
npm run start:prod
```

### Docker
```bash
# Start containers
npm run container:init
docker-compose up -d

# Access container shell
npm run container:run

# Access bash
npm run container:run:bash

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Database
```bash
# Initialize database (migration + seed)
npm run container:db:init

# Create new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Code Quality
```bash
# Format code
npm run format

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format + lint with auto-fix
npm run check:fix
```

### Testing
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 🔧 TypeScript Configuration

### Path Aliases

The boilerplate uses TypeScript path aliases for cleaner imports:
```typescript
// Instead of:
import { User } from '../../../user/user.entity';

// Use:
import { User } from '@user/user.entity';
import { PrismaService } from '@src/prisma/prisma.service';
import { AuthGuard } from '@auth/guards/auth.guard';
import { PORT } from '@configs/env-vars';
```

### Configured Aliases

- `@src/*` → `./src/*`
- `@prisma/*` → `./prisma/*`
- `@auth/*` → `./src/auth/*`
- `@configs/*` → `./src/configs/*`
- `@middleware/*` → `./src/middleware/*`
- `@user/*` → `./src/user/*`

## ⚠️ Common Issues & Solutions

### Port 5432 Already in Use

If you have local PostgreSQL running:
- Docker uses port 5433 (already configured)
- Or stop local PostgreSQL: `brew services stop postgresql`

### TypeScript Deprecation Warnings

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

### Module Resolution Errors

Ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  }
}
```

### Zod Date Schema with Swagger

Use plain classes with `@ApiProperty` for response DTOs instead of Zod schemas to avoid JSON Schema conversion issues.

### Docker Container Not Starting
```bash
# Clean rebuild
docker-compose down -v
docker-compose up -d --build

# Check logs
docker-compose logs -f api
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ using NestJS**