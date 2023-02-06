## Description

Solution for SignalWire's coding challenge.

## Installation

Before installing dependencies, make sure you have NodeJS installed on your machine.

```bash
$ npm install
```

## Running the app

Before running the app, make sure that a Docker deamon instance is running on your machine.

```bash
# 1. Initialize DB 
$ npm run start:dev:db

# 2. Start Server
$ npm run start

# [3. Start Server in hot-reload mode] only required for development
$ npm run start:dev

```

## Test

```bash
# e2e tests
$ npm run test
```
