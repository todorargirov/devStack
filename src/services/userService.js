const { query } = require('../db/pg');
const { sqlGetUserInfo } = require('./sql/userSQL');

async function getUserInfo(username) {
    const res = await query(sqlGetUserInfo, [username]);
    if (res.rowCount === 1) {
        return res.rows[0];
    } else {
        return false;
    }
}

module.exports = {
    getUserInfo,
};
