
# Cowlar Test

A dockerized Full-Stack Todo App where users can signup or use a test account to add todos, complete and delete them.
## Requirements for Running this project

- Docker - https://docs.docker.com/engine/install/

## Setting up the Project Locally

1. Clone the project

```bash
  git clone https://github.com/itxtalal/cowlar-test
```

2. Go to the project directory

```bash
  cd cowlar-test
```


3. Rename `sample.env` to `.env` in both `frontend` and `backend` folders.


4. Build and Run the Docker Container

```bash
  docker compose up --build
```

5. ### [IMP] Apply Prisma Migrations
Open Docker Desktop App, Check the `cowlar-test` network, open the `backend` container. Click on Terminal to access the bash.

6. Run the following command to apply the Migrations
```bash
  npx prisma migrate dev
```

7. ### [OPT] Run Prisma Studio
You can use prisma studio to view the PostgreSQL database and manipulate data directly (not recommended).
- Go to backend directory of the project using your machine's terminal
- Run the following

```bash
  npx prisma studio
```

## Use your App
You can use your app by going to 

```bash
http://localhost:8080/
```

By the way, Backend is hosted on this port
```bash
http://localhost:5000/
```


# Notes

- You need to be logged in before you can access the app.
- You can register by providing Name, Email and Password.
- You can skip the registration by clicking on `Get a Test Account` button on Registration Page.
- After signing in, you will be redirected to the home page where you can add Todos, Complete them, Delete them.


## Running Tests

To run tests, you have to go to the terminal of each `frontend` and `backend`, and run the test command there.

### FRONTEND TESTING

- Open Docker Desktop App
- Check the `cowlar-test` network
- Open the `frontend` container
- Click on Terminal to access the bash.
- Run the following

```bash
  npm test
```

### BACKEND TESTING

- Open Docker Desktop App
- Check the `cowlar-test` network
- Open the `backend` container
- Click on Terminal to access the bash.
- Run the following

```bash
  npm test
```

## Tech Stack
**DOCKERIZED APP**

**Client:** React, Typescript, Vite, TailwindCSS, Axios, Vitest, React Testing Library, React Router Dom, React Hook Form

**Server:** Node, Express, Typescript, Prisma, JWT, Brcypt, Jest, SuperTest

**Database:** PostgreSQL


