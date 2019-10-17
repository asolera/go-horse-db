const fs = require('fs');
const path = require('path');
const config = require('../config');

const file = {
    list: () => fs.readdirSync(config.dataDir).map(file => {
        let sizeBytes = fs.statSync(path.join(config.dataDir, file)).size;
        return {
            name: path.basename(file, '.json'),
            sizeBytes
        }
    })
};

module.exports = file;