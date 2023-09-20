<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descrição

Template para um serviço de usuário usando MongoDB e RabbitMQ.

## Instalação

```bash
$ npm install
$ docker-compose up -d
```

## Iniciando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Criando um usuario

```bash
$ curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Vitor Enzo Gonçalves",
    "password": "123123",
    "email": "vitor_enzo@gmail.com"
}'
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Licença

[MIT licensed](LICENSE).
