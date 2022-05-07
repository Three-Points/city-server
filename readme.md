# Zentrity

<img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=EBCB8B&label=version&prefix=v&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FThree-Points%2Fcity-server%2Fdevelopment%2Fpackage.json" alt="Version project" />

### ✨Introduction

This project was created as a little server to complete the master module named **Server Architecture** that
will be a simple example of NodeJS server.

Also, this project will consider next points:

-   DevOps integration with CI environment (Github Actions).
-   Rest API definition
-   MVC architecture as clean architecture

> **Note.** This project is on https://zentrity.herokuapp.com/api

Also, you need to get environment variables to run this project. For that, this project is supported
by [Doppler](https://www.doppler.com/).

### 📦 Unboxing project

> **Note.** The project engine necessary is 14.x or mayor.

#### ⚡️Scripts

| Script            | Description                                       |
| ----------------- | :------------------------------------------------ |
| `npm run install` | Install all dependencies and prepare the project. |
| `npm run dev`     | Run server in mode `development` on port `3000`.  |
| `npm run test`    | Run all test (both unit test and integration).    |
| `npm run build`   | Build the base code to `dist` directory.          |
| `npm run start`   | Run server in mode `production` on port `8080`.   |

> **Note.** For mode Production, you can use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to simulate
> the project with `heroku local`.

#### ⚙️ Configuration

> **Note.** Zentrity is already configured for git hooks and CI.

Husky is a tool that helps you to configure git hooks. Since the reason for use git hooks because each commit has
the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) structure.

Also, the GitHub Actions is a tool that helps you to run the tests and build the project.

> **Note.** You can view this feature at `.github/workflows` directory.

### 🚧 Works modes

> **Note.** All scripts need to install dependencies. You can run `npm run install` to install all dependencies.

Depending on the mode, the server will run in different ways. As additional environment, you can select docker
environment to simulate heroku environment.

For playing Docker, run Docker Compose:

```bash
npm run build
docker-compose up -d
```

### 📚 Swagger documentation

This project has a swagger documentation. Defined in `docs/api.yml` file.

The route specified for Swagger is on `/docs` depending on the environment.
