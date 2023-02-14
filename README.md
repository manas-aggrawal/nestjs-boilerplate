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
    
- Migrate database (inside container)
    
    ```
      npm run migrate
    ```
    
- Seed database (inside container)
    
    ```
      npm run seed
    ```