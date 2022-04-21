# City Server

<img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=EBCB8B&label=version&prefix=v&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2FThree-Points%2Fcity-server%2Fdevelopment%2Fpackage.json" alt="Version project" />

### ✨Introduction

The propuse of this project is create a little server to complete the master module named **Server Architecture** that will be a simple example of NodeJS server.

Also, this project will consider next points:

- DevOps integration with CI environment (Github Actions).
- Rest API definition
- MVC architecture as clean architecture

> **Note.** This project is on https://[name].herokuapp.com

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

> **Note.** For mode Production, you can use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to simulate the project witih `heroku local`.

#### ⚙️ Configuration

> **Note.** Thingst is already configured for git hooks and CI.

Husky is a tool that helps you to configure git hooks. Since the reason for use git hooks because each commit has the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) structure.

Also, the Github Actions is a tool that helps you to run the tests and build the project.

> **Note.** You can view this feature at `.github/workflows` direcotry.
