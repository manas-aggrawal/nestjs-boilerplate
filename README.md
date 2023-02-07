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
