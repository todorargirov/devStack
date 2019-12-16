const { query } = require('../db/pg');

async function getPingService(request, reply) {
    const res = await query('SELECT NOW() as now');
    return {
        rowCount: res.rowCount,
        rows: res.rows,
    };
}

module.exports = {
    getPingService,
};
