const config = require('../config');
const jwt = require('jsonwebtoken');

const env_prefix = config.JWT_PREFIX;
const env_secret = config.JWT_SECRET;

const getToken = payload => {
    return jwt.sign({ payload: payload }, env_secret, { expiresIn: '24h' });
};

const checkRequest = authorization => {
    // check headers
    if (!authorization) {
        return { success: false, data: '401 Not Authorized' };
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix !== env_prefix) {
        return { success: false, data: '401 Not Authorized' };
    }
    try {
        const decoded = jwt.verify(token, env_secret);
        return { sucess: true, data: decoded };
    } catch (err) {
        return { success: false, data: [err.name, err.message].join(':') };
    }
};

module.exports = { getToken, checkRequest };
