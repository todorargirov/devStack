const { query } = require('../db/pg');

async function getUser(request, reply) {
    const res = await query('SELECT * from ff_users where id=$1', [request.params.id]);
    return {
        rowCount: res.rowCount,
        rows: res.rows,
    };
}

module.exports = {
    getUser,
};
