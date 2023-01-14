# Members Only

This is an assignment project from [the Odin Project](https://www.theodinproject.com/lessons/nodejs-members-only). It is part of the full stack Authentication section of their course.

_PLEASE NOTE: I've added typescript and react to this project. The original project was just node and express._

## Test the app locally on your machine

- Clone the repo and `cd` into the project directory
- Add a _.env_ file in the backend directory with the following variables:

```dotenv
MONGODB_URI='YOUR_MONGODB_URI'
SESSION_SECRET_KEY='YOUR_SECRET_KEY'
PORT=4000
```

- Run:

```bash
cd backend
yarn install
yarn start
```

- Open a new terminal and run:

```bash
cd client
yarn install
yarn start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
