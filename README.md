## Project Overview And Objectives

This project is a basic e-commerce system built with Nestjs framework, utilizing postgreSQL for database management. It's a Backend Take-Home Assessment aimed at testing candidates proficiency in Nestjs, PostgreSQL or MongoDB and version control. The evaluation criteria include the following:

- Code Quality: Clean, readable, and maintainable code following NestJS best practices.
- Security: Proper implementation of authentication, role-based access control, user/product management, and rate limiting. 
- Validation & Error Handling: Robust input validation and error handling.
- Documentation: Thorough API documentation and a detailed README.md.
- Performance Considerations: Any optimizations or performance improvements will be evaluated for bonus points.
- Git & Version Control: Clear commit history and proper use of Git for version control.

## Instructions For Setting Up The Development Environment

- Visit https://github.com/iamvinchi/Techinnover-Basic-E-Commerce-System-assement
- Copy https://github.com/iamvinchi/Techinnover-Basic-E-Commerce-System-assement.git
- In your development environment run the following commands:
```bash
$ git clone https://github.com/iamvinchi/Techinnover-Basic-E-Commerce-System-assement.git

$ cd Techinnover-Basic-E-Commerce-System-assemen
```
- Open with your favourite code editor.

#  How To Run The Application Locally

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Variables

```bash
PORT = 3001
NODE_ENV=development
USE_SSL=true
DB_DIALECT=postgres
ENVIRONMENT=render
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=password1@
DB_NAME=db-name
JWT_EXPIRY=1h
JWT_SECRET=my-jwt-secret-here
DB_SYNC=true
DB_LOG=true
```
