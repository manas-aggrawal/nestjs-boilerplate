# README

# Boiler plate focused on CMS backend

## This boilerplate covers

- JWT Token configuration
    - login & refresh token
- Docker
- Prisma
- Eslint & Prettier
- Swagger documentation
- Husky
- Conventional Commits

## ****Project directory structure****

Nestjs architecture is based into modules, controllers and services. This boilerplate have the following core files:

```bash
src
|- ...
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

> *In this same project, theres a file called `.env.example` that we can use as a example to set a standard configuration into `.env` file.*
> 

## Authentication

It provides 3 kinds of authentication with [Passport strategies](https://docs.nestjs.com/security/authentication):

- Local strategy
    - User provides an username and a password then if these are valid, the API returns with the tokens, else it will return Unauthorised.
    
    > *mostly used in login/sign in routes*
    > 
- Access token strategy
    - First token that is obtained from the local strategy. Is used to access all the routes of the API (with the exception of the refresh token one)
    
    > *used in all the routes*
    > 
- Refresh token strategy
    - Second token that is obtained from the local strategy. Is used to access the refresh-token route and obtain new tokens, who are not expired
    
    > *used in the refresh token route*
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
        
    
    > [click here some documentation about modules in Nest](https://docs.nestjs.com/modules)
    > 
3. Add a service for your API:
Theres two ways to do that:
    1. Using Nest CLI
        
        ```bash
        nest generate service <nameOfAPI>
        ```
        
    2. Creating a file, into your API root folder, with the following pattern:
    `<nameOfAPI>.service.ts`
    And add this code into that file:
        
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
        
    
    > [click here some documentation about services in Nest](https://docs.nestjs.com/providers#services)
    > 
4. (If your API needs routes) Add a controller for your API:
    
    Theres two ways to do that:
    
    1. Using Nest CLI
        
        ```bash
        nest generate controller <nameOfAPI>
        ```
        
    2. Creating a file, into your API root folder, with the following pattern:
    `<nameOfAPI>.controller.ts`
    And add this code into that file:
        
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

> For use **services** in **controllers**, we have to inject through the constructor of **controller** class
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

- Create a new migration (inside container)
    
    ```
      npm run migrate:new
    ```
    
- Migrate database (inside container)
    
    ```
      npm run migrate
    ```
    
- Seed database (inside container)
    
    ```
      npm run seed
    ```