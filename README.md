# NestJS Boilerplate 🚀

A production-ready NestJS boilerplate with authentication, database, and all the essentials pre-configured. **Free to use, fork, and customize!**

## ✨ Features

- 🔐 **JWT Authentication** - Access & refresh tokens ready to go
- 🗄️ **Prisma ORM** - Type-safe database with migrations
- 🐳 **Docker** - Containerized development environment
- 📝 **Swagger** - Auto-generated API documentation
- ✅ **Validation** - Request validation with Joi
- 🎯 **CRUD Generator** - Scaffold resources instantly
- 🔑 **Password Recovery** - Forgot password flow included
- 🎨 **Code Quality** - ESLint & Prettier configured
- 🏗️ **Clean Architecture** - Modular, scalable structure

## 🚀 Quick Start

### Prerequisites
- Node.js >= 14.x
- Docker & Docker Compose
- npm or yarn

### Get Started in 3 Steps

```bash
# 1. Clone or fork this repo
git clone https://github.com/manas-aggrawal/nestjs-boilerplate.git
cd nestjs-boilerplate

# 2. Start the containers
npm run container:init

# 3. Set up the database
npm run container:db:init
```

Your API is now running at `http://localhost:3000` 🎉

Swagger docs available at `http://localhost:3000/docs`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# Database
PORT_DATABASE=5432
PG_USER="postgres"
PG_PASSWORD="your-secure-password"
PG_DATABASE_NAME="your-database"
DATABASE_URL="postgresql://postgres:your-secure-password@localhost:5432/your-database"

# JWT Secrets
JWT_ACCESS_TOKEN_SECRET="your-access-secret"
JWT_REFRESH_TOKEN_SECRET="your-refresh-secret"
```

> 💡 Use `.env.example` as a template

## 📚 Core Concepts

### Project Structure

```
src/
├── app.module.ts          # Root module
├── app.controller.ts      # Health checks & app routes
├── app.service.ts         # Core app services
├── main.ts               # Application entry point
├── auth/                 # Authentication module
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── strategies/      # Passport strategies
├── user/                # User module example
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── dto/            # Data transfer objects
└── common/             # Shared utilities
    ├── guards/        # Auth guards
    ├── decorators/    # Custom decorators
    └── validators/    # Validation schemas
```

### Authentication Flow

Three authentication strategies included:

1. **Local Strategy** - Login with username/password
2. **Access Token** - JWT for API access (15min default)
3. **Refresh Token** - JWT for token renewal (7 days default)

```typescript
// Login example
POST /auth/login
{
  "username": "john",
  "password": "secret123"
}

// Returns
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc..."
}
```

## 🛠️ Development

### Creating a New Module

Use the NestJS CLI for quick scaffolding:

```bash
# Generate a complete CRUD resource
nest generate resource products

# Or create individual components
nest generate module products
nest generate controller products
nest generate service products
```

### Adding Routes

```typescript
// products.controller.ts
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)  // Protect with JWT
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(new Validator(createProductSchema, 'body'))  // Validate input
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}
```

### Database Schema (Prisma)

1. Define your model in `prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

2. Generate migration:

```bash
npm run migrate:new
```

3. Apply migration:

```bash
npm run migrate
```

### Validation

Use Joi schemas with the Validator guard:

```typescript
// product.validation.ts
export const createProductSchema = Joi.object({
  name: Joi.string().required().min(3),
  description: Joi.string().optional(),
  price: Joi.number().positive().required()
});

// In controller
@Post()
@UseGuards(new Validator(createProductSchema, 'body'))
async create(@Body() dto: CreateProductDto) {
  // Body is validated before reaching here
}
```

### Swagger Documentation

Add Swagger decorators for auto-documentation:

```typescript
@ApiTags('products')
@Controller('products')
export class ProductsController {
  
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async findAll() {
    // ...
  }
}
```

## 📦 Useful Commands

### Development

```bash
# Start development environment
npm run container:init

# Access container shell
npm run container:run

# Run in watch mode (inside container)
npm run start:dev

# Run tests
npm run test
```

### Database

```bash
# Initialize database (migrations + seed)
npm run container:db:init

# Create new migration (inside container)
npm run migrate:new

# Run migrations (inside container)
npm run migrate

# Seed database (inside container)
npm run seed
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🎯 Examples

### Protected Route Example

```typescript
@Controller('profile')
export class ProfileController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }
}
```

### Password Recovery Flow

```typescript
// 1. Request password reset
GET /auth/forgot-password
Body: { "username": "john" }

// Returns reset token (in production, send via email)
{ "reset_token": "..." }

// 2. Reset password
PATCH /auth/update-password
Headers: { "Authorization": "Bearer <reset_token>" }
Body: { "password": "newPassword123" }
```

### CRUD Resource Example

```bash
# Generate complete CRUD
nest generate resource products

# This creates:
# - products.module.ts
# - products.controller.ts (with CRUD endpoints)
# - products.service.ts (with CRUD methods)
# - DTOs for create/update
# - Entity definition
```

## 🆓 Open Source & Contributing

**This boilerplate is completely free!** Feel free to:
- 🍴 **Fork it** and make it your own
- 🔧 **Customize** everything to fit your needs
- 🚀 **Use it** in any project (personal or commercial)
- 💡 **Contribute back** if you build something awesome (but no pressure!)

### Want to Contribute?

We'd love to see what you build! Here's how to contribute:

```bash
# 1. Fork the repo
# 2. Clone your fork
git clone https://github.com/manas-aggrawal/nestjs-boilerplate.git

# 3. Create a feature branch
git checkout -b feature/awesome-addition

# 4. Make your changes and test
npm test

# 5. Push to your fork
git push origin feature/awesome-addition

# 6. Open a Pull Request
```

**All contributions welcome:**
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 Better examples
- 💡 Suggestions and ideas

### Already Using This?

No attribution required! This is MIT licensed - use it however you want. But if you build something cool, we'd love to hear about it!

## 📝 Naming Conventions

- **Classes/Interfaces**: `PascalCase` (singular)
- **Variables**: `camelCase`
- **Constants/Env**: `SNAKE_CASE` (all caps)
- **Files/Folders**: `kebab-case` (singular)
- **Module files**: `<name>.module.ts`
- **Controller files**: `<name>.controller.ts`
- **Service files**: `<name>.service.ts`

## 🐛 Troubleshooting

### Container won't start
- Check if ports 3000 and 5432 are available
- Ensure Docker is running
- Try `docker-compose down` then `npm run container:init`

### Database connection issues
- Verify DATABASE_URL in `.env` matches your Docker setup
- Ensure PostgreSQL container is running: `docker ps`
- Check database logs: `docker logs nestjs-boilerplate-db`

### Migration errors
- Run migrations inside container: `npm run container:run` then `npm run migrate`
- Check Prisma schema syntax
- Ensure database is accessible

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Passport.js Strategies](http://www.passportjs.org/packages)
- [Joi Validation](https://joi.dev/api)
- [Docker Compose](https://docs.docker.com/compose)

## 📄 License

MIT - Use this however you want!

---

Built with ❤️ for the NestJS community. Happy coding! 🚀