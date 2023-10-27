# Node.js Express, Sequelize & PostgreSQL

The following table shows overview of the Rest APIs that will be exported:

- GET     `api/user`	                get all Users
- PUT     `api/user/update-balance`   update user balance (need to pass `userId` (existig user id is `1`) and `amount` as a request body)

### Test the APIs
1. Installing module nodes `npm install`.
2. Run migrations: `npm run migrate`.
3. Run our Node.js application with command: `npm start` The app will run on `8080` port by default.

Using Postman, we're gonna test all the Apis above.

```
Host - http://localhost:8080/api/user/update-balance
Body - {
    "userId": "1",
    "amount": 2
}
```

## Project setup
```
npm install
```

## Run migrate
```
npm run migrate
```

### Run

Before start you should update `config.json` file with right credentials (By default app uses `development` config).

```
npm start
```
