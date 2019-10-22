const uuidv1 = require('uuid/v1');
const lowDB = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const config = require('../config');
const crypto = require('../helpers/crypto');

class Database {
    constructor(databaseName) {
        this._adapter = new FileSync(`${config.dataDir}${databaseName}.json`, {
            serialize: (data) => this._serialize(data),
            deserialize: (data) => this._deserialize(data)
        });
        this._db = lowDB(this._adapter);
    }

    _serialize(data) {
        if (config.crypto.mode == 'true') {
            return crypto.encrypt(JSON.stringify(data), config.crypto.algorithm, config.crypto.encryptionKey);
        } else {
            return JSON.stringify(data);
        }
    }

    _deserialize(data) {
        if (config.crypto.mode == 'true') {
            return JSON.parse(crypto.decrypt(data, config.crypto.algorithm, config.crypto.encryptionKey))
        } else {
            return JSON.parse(data);
        }
    }

    _has(key) {
        return this._db.has(key).value();
    }

    _prepare(key) {
        return this._db.defaults({[key]: []}).write();
    }

    _singlePost(key, value) {
        value._id = uuidv1();
        this._db.get(key).push(value).write();
        return value;
    }

    get(key) {
        if (!this._has(key)) return false;
        return this._db.get(key).value();
    }

    getById(key, _id) {
        if (!this._has(key)) return false;
        return this._db.get(key).find({ _id }).value();
    }

    all() {
        return this._db.getState();
    }

    post(key, value) {
        this._prepare(key);
        if (config.debugMode == 'true') console.table(value);

        if (Array.isArray(value)) {
            value = value.map(row => this._singlePost(key, row));
        } else {
            value = this._singlePost(key, value);
        }
        
        return value;
    }

    update(key, _id, value) {
        if (!this._has(key)) return false;
        if (!this.getById(key, _id)) return false;
        value._id = _id;
        if (config.debugMode == 'true') console.table(value);
        return this._db.get(key).find({ _id }).assign(value).write();
    }

    delete(key, _id) {
        if (!this._has(key)) return false;
        if (!this.getById(key, _id)) return false;
        this._db.get(key).remove({ _id }).write();
        return true;
    }

    removeTable(key) {
        if (!this._has(key)) return false;
        this._db.get(key).remove().write();
        return true;
    }
}

module.exports = Database;