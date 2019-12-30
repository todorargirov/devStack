const { query } = require('../db/pg');

async function getUserInfo(username) {
    const res = await query('SELECT * from ff_users where username=$1', [username]);
    return {
        rowCount: res.rowCount,
        rows: res.rows,
    };
}

module.exports = {
    getUserInfo,
};
