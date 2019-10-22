# :horse: HorseDB 

HorseDB is a REST-based database, built on top of [lowdb](https://github.com/typicode/lowdb) package (a small JSON database for Node), inspired by Extreme Go Horse Process. :horse:

Similar to [json-server](https://github.com/typicode/json-server), HorseDB was created to allow quick storage for configuration data. 

## Installation

HorseDB can be deployed with Docker.

- **Docker Hub:** https://hub.docker.com/r/asolera/go-horse-db

The container (easiest) way:

```sh
docker run -d -p 3000:3000 --name go-horse-db asolera/go-horse-db:1.0
```

To persist data inside host, create a volume mapped to `/home/node/app/data`.

Example:

```sh
docker run -d -p 3000:3000 -v horsedb-data:/home/node/app/data --name horsedb asolera/horsedb:1.0
```

You can also set environment variables with various options (see below).

HorseDB can also be deployed as a service. [See example](docker-stack.yml).

## Usage / API

HorseDB creates a new JSON file for every database provided in API.  
It also creates an UUID for every data inserted.

This API was built for Docker environment and can be accessible via configured port (default is 3000).

Example: http://localhost:3000/

| **Route** | **Method** | **Description** |
|---|---|---|
| / | GET | Retrieves all databases names. |
| /:database | GET | Retrieves all data stored in provided database name. |
| /:database/:key | GET | Get all records stored in the table. |
| /:database/:key | POST | Inserts a new record inside the table. |
| /:database/:key | DELETE | Removes the table. |
| /:database/:key/:id | GET | Get data by UUID. |
| /:database/:key/:id | PUT | Updates the record. |
| /:database/:key/:id | DELETE | Deletes the record. |

## Environment Variables

| **Variable** | **Options** | **Default** | **Description** |
|---|---|---|---|
| AUTH_MODE | true/false | false | Enables token authentication (token must be passed in every request) |
| AUTH_TOKEN_READ | token string | false | Token for read only requests. |
| AUTH_TOKEN_WRITE | token string | false | Token for write requests. |
| DEBUG_MODE | true/false | false | Enables debug mode in console. |
| API_PORT | port number | 3000 | API port for listening requests. |
| ENCRYPTION_MODE | true/false | false | Enables database (JSON file) encryption.* |
| ENCRYPTION_KEY | secret key | defaultEncryptionKey | Secret key for encryption. |
| ENCRYPTION_ALGORITHM | encryption algorithm | aes-128-cbc | Encryption algorithm. |

_**Encryption note:** If encryption is enabled, all databases will be encrypted. It is not possible (yet) to switch from an encrypted database to a non-encrypted database (and vice-versa)._

## Author

- Andrew Solera (andrewsolera@gmail.com)
