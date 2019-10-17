const config = {
    auth: {
        mode: (process.env.AUTH_MODE || 'false').trim(),
        token: {
            read: (process.env.AUTH_TOKEN_READ || 'false').trim(),
            write: (process.env.AUTH_TOKEN_WRITE || 'false').trim()
        }
    },
    debugMode: (process.env.DEBUG_MODE || 'false').trim(),
    port: process.env.API_PORT || 3000,
    dataDir: 'data/',
    crypto: {
        mode: (process.env.ENCRYPTION_MODE || 'false').trim(),
        encryptionKey: (process.env.ENCRYPTION_KEY || 'defaultEncryptionKey').trim(),
        algorithm: (process.env.ENCRYPTION_ALGORITHM || 'aes-128-cbc').trim()
    }
};

module.exports = config;