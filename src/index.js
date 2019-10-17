const logger = require('./helpers/logger');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const Database = require('./services/db');
const file = require('./helpers/file');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.debug(`${req.method}: ${req.originalUrl}`);
    next();
});

// Check for authentication token (if enabled)
app.use((req, res, next) => {
    let token = req.query.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]) || 'false';
    if (config.auth.mode == 'true') {
        if (req.method == 'GET' && config.auth.token.read != 'false') {
            if (token != config.auth.token.read || token == 'false') {
                return res.status(403).send('Error: missing authentication token or invalid token!');
            }
        }

        if ((req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') && config.auth.token.write != 'false') {
            if (token != config.auth.token.write || token == 'false') {
                return res.status(403).send('Error: missing authentication token or invalid token!');
            }
        }
    }
    next();
});

app.listen(config.port, () => {
    logger.info(`API start listening on port ${config.port}...`);
    console.table(config);
});

app.get('/', (req, res) => {
    let response = {
        message: 'Go Horse DB is a REST-based database, built on top of lowdb package, a small JSON database for Node.',
        databases: file.list()
    };
    res.send(response);
});

app.get('/:databaseName', (req, res) => {
    let { databaseName } = req.params;
    const db = new Database(databaseName);
    let response = db.all();
    res.send(response);
});

app.get('/:databaseName/:key', (req, res) => {
    let { databaseName, key } = req.params;
    const db = new Database(databaseName);
    let response = db.get(key);
    if (!response) {
        res.sendStatus(404);
    } else {
        res.send(response);
    }
});

app.get('/:databaseName/:key/:_id', (req, res) => {
    let { databaseName, key, _id } = req.params;
    const db = new Database(databaseName);
    let response = db.getById(key, _id);
    if (!response) {
        res.sendStatus(404);
    } else {
        res.send(response);
    }
});

app.post('/:databaseName/:key', (req, res) => {
    let { databaseName, key } = req.params;
    const db = new Database(databaseName);
    let response = db.post(key, req.body);
    res.send(response);
});

app.put('/:databaseName/:key/:_id', (req, res) => {
    let { databaseName, key, _id } = req.params;
    const db = new Database(databaseName);
    let response = db.update(key, _id, req.body);
    if (!response) {
        res.sendStatus(404);
    } else {
        res.send(response);
    }
});

app.delete('/:databaseName/:key/:_id', (req, res) => {
    let { databaseName, key, _id } = req.params;
    const db = new Database(databaseName);
    let response = db.delete(key, _id);
    if (!response) {
        res.sendStatus(404);
    } else {
        res.sendStatus(200);
    }
});