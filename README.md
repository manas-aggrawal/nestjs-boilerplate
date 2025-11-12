# README

# NestJS Boilerplate

> **Latest Update (v0.1.0)**: Migrated from ESLint/Prettier to Biome for faster, unified linting and formatting. See [releases](https://github.com/manas-aggrawal/nestjs-boilerplate/releases) for details.

## This boilerplate covers

- JWT Token configuration
    - login & refresh token
- Docker
- Prisma
- **Biome (Linting & Formatting)** ← Changed from "Eslint & Prettier"
- Swagger documentation
- Husky
- Conventional Commits
- CRUD
- Forgot Password
- Validation with joi

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

### Migration Notes

- Biome replaces both ESLint and Prettier with a single, faster tool
- Module resolution updated from deprecated `baseUrl` to `paths` configuration

## Project directory structure

Nestjs architecture is based into modules, controllers and services. This boilerplate have the following core files:

```bash
src
|-...
|- app.module.ts
|- app.controller.ts
|- app.service.ts
|- main.ts
|- ...
```

### app.module.ts

- This is the most important file in this application. This module file essentially bundles all the controllers and providers of our application together.

### app.controller.ts

- In this file you will find all the routes related to our application itself, like a `/health` route to check application status.

### app.service.ts

- This service will include methods that will perform a certain operation. For example, a service to find all users.

### main.ts

- The entry file of our application, here you find the configs for our server and application in general like cors, ports, validation pipes and etc.

## Secret management

For store database configurations, jwt secrets and ports, this boilerplate uses a `.env` file with the following variables:

```
# Config
PORT=...
PORT_DATABASE=...

# Postgres
PG_USER="..."
PG_PASSWORD="..."
PG_DATABASE_NAME="..."

# JWT
JWT_ACCESS_TOKEN_SECRET="..."
JWT_REFRESH_TOKEN_SECRET="..."

DATABASE_URL="..."
```

> In this same project, theres a file called .env.example that we can use as a example to set a standard configuration into .env file.

## Commit rules
This project follows the Conventional Commits specification for creating standardized commit messages in our Git repository. This means that each commit message is structured in a consistent way, using a type, an optional scope, and a subject.

Example:
```
<type>[optional scope]: <description>

git commit -m "feat: create users"
```

*Commits without this pattern will be blocked.*

More information at: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

## Authentication

It provides 3 kinds of authentication with [Passport strategies](https://docs.nestjs.com/security/authentication):

- Local strategy
    - User provides an username and a password then if these are valid, the API returns with the tokens, else it will return Unauthorised.
    
    > mostly used in login/sign in routes
    > 
- Access token strategy
    - First token that is obtained from the local strategy. Is used to access all the routes of the API (with the exception of the refresh token one)
    
    > used in all the routes
    > 
- Refresh token strategy
    - Second token that is obtained from the local strategy. Is used to access the refresh-token route and obtain new tokens, who are not expired
    
    > used in the refresh token route
    > 

## Add a new API

1. Create a folder with the *name of the API* into the `src` folder your new API path should be: `.../nest-bp/src/nameOfAPI/`
2. Create a **Module** for your API
    
    Theres two ways to do that:
    
    1. Using Nest CLI:
        
        ```bash
        nest generate module <nameOfAPI>
        ```
        
    2. Creating a file, into your API root folder, with the following pattern: `<nameOfAPI>.module.ts` And add this code into that file:
        
        ```tsx
        import { Module } from '@nestjs/common';
        @Module({
                controllers: [],
                providers: [],
        })
        export class <nameOfAPI>Module {}
        ```
        
        And then, you have to add our new module into our app main module imports
        
        ```tsx
        import { Module } from '@nestjs/common';
        @Module({
            imports: [..., <nameOfApi>Module],
          controllers: [...],
          providers: [...],
        })
        export class AppModule {}
        ```
        
    
    > click here some documentation about modules in Nest
    > 
3. Add a service for your API: Theres two ways to do that:
    1. Using Nest CLI
        
        ```bash
        nest generate service <nameOfAPI>
        ```
        
    2. Creating a file, into your API root folder, with the following pattern: `<nameOfAPI>.service.ts` And add this code into that file:
        
        ```tsx
        import { Injectable } from '@nestjs/common';
        
        @Injectable()
        export class <nameOfAPI>Service {}
        ```
        
        And then, you have to add our new service into our app main module providers:
        
        ```tsx
        import { Module } from '@nestjs/common';
        @Module({
            imports: [...],
          controllers: [...],
          providers: [..., , <nameOfApi>Service],
        })
        export class AppModule {}
        ```
        
    
    > click here some documentation about services in Nest
    > 
4. (If your API needs routes) Add a controller for your API:
    
    Theres two ways to do that:
    
    1. Using Nest CLI
        
        ```bash
        nest generate controller <nameOfAPI>
        ```
        
    2. Creating a file, into your API root folder, with the following pattern: `<nameOfAPI>.controller.ts` And add this code into that file:
        
        ```tsx
        import { Controller } from '@nestjs/common';
        
        @Controller()
        export class <nameOfAPI>Controller {}
        ```
        
        And then, you have to add our new **controller** into our app main module controllers:
        
        ```tsx
        import { Module } from '@nestjs/common';
        @Module({
            imports: [...],
          controllers: [..., <nameOfApi>Controller],
          providers: [...],
        })
        export class AppModule {}
        ```
        

## Adding a new route to our API

- Into the controller of your API, add a function with the follow decorators:
    - HTTP Method (Required)
    - Swagger Configuration (Optional)
    - Swagger Tag (Optional)
    - UseGuards (Optional)
    - … etc
- Basic route example for get all users

```tsx
import { Controller } from '@nestjs/common';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers() {
        return this.userService.getAll()
    }
}
```

> For use services in controllers, we have to inject through the constructor of controller class
> 

## Create a new schema (Prisma)

Into the boilerplate, we should have a file called `schema.prisma` with this content:

```tsx
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-arm64-openssl-1.1.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

All we have to do is add a new model into this file, for example creating a `Post` model.

```tsx
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-arm64-openssl-1.1.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id   String @id @default(uuid())
  name String
    description String
}
```

And for it takes changes in the database, we should create a migration for that with the following command **(into the container)**:

```bash
npm run migrate:new
```

Then we have to input the name of the migration and thats it!

## Documentation with Swagger

With Nest, we can add swagger documentation easier because it great integration. All we have to do is:

1. Create an file in the root of our desired API folder with the following pattern:
    
    `<nameOfRoute>.swagger.ts`
    
    > *is preferred that the name of the file follow the name of the route.*
    > 
2. And it should contain a function that returns a function called `applyDecorators` that wrap swagger decorators, like this:
    
    ```tsx
    import { applyDecorators } from '@nestjs/common';
    
    export const <nameOfRoute>SwaggerConfig = () =>
    	applyDecorators(
    		// Swagger decorators here...
    	);
    ```
    
    - *This function is a wrap of Decorators, so it could be used as a Decorator itself.*
3. Then add this decorator in our route.
    
    ```tsx
    	...
    	@<nameOfRoute>SwaggerConfig()
    	async <nameOfRoute>(@Request() req) {
    		return this.authService.giveTokens(req.user);
    	}
    ```
    

Make sure swagger configuration is setup in `main.ts` file. Here an example of swagger config:

```tsx
...
const config = new DocumentBuilder()
		.setTitle('Nest bp example')
		.setDescription('The Nestjs boilerplate API description')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, document);
...
```

## CRUD

With NestJS creating a CRUD API is very simple, we just need a command:

`nest generate resource <nameOfAPI>` 

It will create a folder structure in our `src` folder like this:

```bash
src
|-...
|- <nameOfAPI>
	|- dto
		|- create-<nameOfAPI>.dto.ts
		|- update-<nameOfAPI>.dto.ts
	|- entities
		|- <nameOfAPI>.entity.ts
	|- <nameOfAPI>.controller.spec
	|- <nameOfAPI>.controller.ts
	|- <nameOfAPI>.module.ts
	|- <nameOfAPI>.crud-sample.service.spec
	|- <nameOfAPI>.service.ts
|- ...
```

- `.dto` files are data transfer objects, we use use it to verify body's of our HTTP requests;
- `.spec` files are tests files to unit test our controller routes & services
- `.entity` files are our API entities 

Then we just have to implement our code into `<nameOfAPI>.service.ts` file.
> For a manual implementation of this CRUD, theres a folder called `crud-sample` as a example of how to do it.

## Forgot password

The forgot password logic consist in two steps:

 1. Send a GET HTTP request to `/forgot-password` passing the username (in this case) in the body.
	```
		GET /forgot-password
		BODY: {
			"username": "admin" // send a valid username
		}
	```
	For this example this route will retrieve the token right away, but in a real case we have to create a logic to user confirm his account with an email or anything else.

 2. With the `forgot_password_token`, now we have to send a PATCH HTTP request to `/update-password` passing the desired password to change from this user.
	```
		GET /update-password
		BODY: {
			"password": "123"
		}
	```

 	If the token is valid, the password will be updated.

## Validation with joi

In order to validate our body, query or params, we have to use `Validator` Guard in our routes.

We just have to pass an Joi `Schema` and a HttpType, like `body`, `params`, `query`,for example:

```
	@UseGuards(new Validator(<Schema>, <HttpType>))
```

## Commands

- Start project
    
    ```
      npm run container:init
    ```
    
- Access container shell (or bash)
    
    ```
      npm run container:run
      npm run container:run:bash
    ```
    
- Config database (migration & seed)
    
    ```
      npm run container:db:init
    ```
    
- Create a new migration (inside container - run `npm run container:run` first)
    
    ```
      npm run migrate:new
    ```
    
- Migrate database (inside container - run `npm run container:run` first)
    
    ```
      npm run migrate
    ```
    
- Seed database (inside container - run `npm run container:run` first)
    
    ```
      npm run seed
    ```