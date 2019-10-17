const crypto = require('crypto');

const myCrypto = {
    encrypt: (text, algorithm, encryptionKey) => {
        let mykey = crypto.createCipher(algorithm, encryptionKey);
        let mystr = mykey.update(text, 'utf8', 'hex');
        mystr += mykey.final('hex');
        return mystr;
    },
    decrypt(text, algorithm, encryptionKey) {
        let mykey = crypto.createDecipher(algorithm, encryptionKey);
        let mystr = mykey.update(text, 'hex', 'utf8');
        mystr += mykey.final('utf8');
        return mystr;
    }
};

module.exports = myCrypto;