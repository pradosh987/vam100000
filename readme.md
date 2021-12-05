# Vamstar Project

## Local setup
* Create database and populate .env file
* Run migrations and seed data
```
 npx knex migrate:latest
 npx knex seed:run
```

## Running tests
* create test db and populate env
* Run migrations using 
```
npx knex migrate:latest --env test
```
* Run tests
```
npm run test
```