const config = require('../config');

const logger = {
    _getDate: () => `[${new Date().toLocaleString()}]`,
    _log: (txt, type) => {
        console.log(`${logger._getDate()} [${type}] ${txt}`);
    },
    info: (txt) => {
        logger._log(txt, 'INFO');
    },
    debug: (txt) => {
        if (config.debugMode == 'true') {
            logger._log(txt, 'DEBUG');
        }
    },
    error: (txt) => {
        logger._log(txt, 'ERROR');
    }
};

module.exports = logger;