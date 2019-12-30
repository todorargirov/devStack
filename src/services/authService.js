require('dotenv').config();
const jwt = require('jsonwebtoken');
const env_prefix = process.env.JWT_PREFIX;
const env_secret = process.env.JWT_SECRET;

const getToken = username => {
    return jwt.sign({ username: username }, env_secret, { expiresIn: '24h' });
};

const checkRequest = request => {
    // check headers
    if (!request.headers['authorization']) {
        return { success: false, data: '401 Not Authorized' };
    }

    const [prefix, token] = request.headers['authorization'].split(' ');

    if (prefix !== env_prefix) {
        return { success: false, data: '401 Not Authorized' };
    }
    try {
        const decoded = jwt.verify(token, env_secret);
        return { sucess: true, data: decoded };
    } catch (err) {
        request.log.info(' Error decoding token : ', err);
        return { success: false, data: [err.name, err.message].join(':') };
    }
};

module.exports = { getToken, checkRequest };
