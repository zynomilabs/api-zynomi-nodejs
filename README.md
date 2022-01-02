# api-zynomi-nodejs

## Pre-requisites

- Docker
- Docker Desktop
- Node.JS
- NPM
- PostgreSQL connection string
- VS.code editor
- DB Vizualizer
- Postman REST API Client
- [Optional] For non docker environment, Node.JS Lastest (> 10) is required.

## How to run the application?

- Clone repository
- cd to [app] folder
- change the DB connection details in `config/datastore.js`
- run docker thru `docker-compose up`
- access the application @ `http://localhost:1337`

## Core Commands

```
rm -rf node_modules
```

```bash
git clone https://github.com/senthilsweb/api.backend.sailsjs.git
```

```bash
cd api.backend.sailsjs
```

Start Docker

```bash
docker-compose up
```

```bash
npm install
```

```bash
sails lift
```

Stop the server

```bash
CTRL + C
```

Stop docker-compose

```bash
docker-compose down
```

The API base url

```bash
http://localhost:1337
```

## Core REST APIs

### Endpoints

Request | Endpoints

## Miscellaneous Commands

List docker images

```dotnetcli
docker images
```

Stop container

```bash
docker stop <container-id>
```

Remove docker images

```bash
docker image rm --force <imageid>
```

### Add / generate new REST apis / actions

```bash
sails generate model <table-name>
```

Example

```bash
sails generate model users
sails generate model roles
```

### Commit and Push your changes to the Git repository

```bash
sh gitcommit.sh '<optional commit comments>'
```

## Todo's

- [ ] Github actions
- [ ] Swagger-ui for REST API Documentaiton

## Links

- [Sails framework documentation](https://sailsjs.com/get-started)
- [Blueprint Routes](https://sailsjs.com/documentation/concepts/blueprints/blueprint-routes)
