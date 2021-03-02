# Blanja Mobile React-Native

## Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements-for-development)
- [Installation](#installation-for-development)

## Description

**Blanja** is a app-based e-commerce application that allows buyers to order
products of their choice. Consists of 2 types of users, namely buyers and
sellers.

## Features

- Browsing items
- Order product
- History transaction
- Add or edit product (sellers only)
- Chat with seller
- Edit profile
- Reset Password
- etc

## Requirements for Development

- [`Node Js`](https://nodejs.org/en/)
- [`npm`](https://www.npmjs.com/get-npm)
- [`ReactNative`](https://reactnative.dev/)
- [`BlanjaBackend`](https://github.com/abdipriyangga/API-Blanja)

## Installation for Development

1. Open your terminal or command prompt
2. Type `git clone https://github.com/abdipriyangga/blanja-mobile-app.git`
3. Open the folder and type `npm install` or `yarn install` for install dependencies from package.json
4. Create file **_.env_** in root directory with the following contents :

```bash
BASE_URL = "your_ip_backend_API_URL"
```

Example :

- http://host_backend:port_backend is http://localhost:8000

so, you can write in .env file like this :

```bash
BASE_URL = "http://localhost:8000"
```

5. Before run this project, you must configure and run backend. You can find backend for this project [here](https://github.com/abdipriyangga/API-Blanja)
6. Type `npm run server` in terminal for running backend.
7. If you want to build this project, type `react-native start --reset-cache` then `react-native run-android`.








