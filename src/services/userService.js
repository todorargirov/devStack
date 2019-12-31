const { query } = require('../db/pg');
const { sqlGetUserInfo, sqlGetUserInfoList, sqlCreateUser } = require('./sql/userSQL');

async function getUserInfo(user_name) {
    const userInfo = await query(sqlGetUserInfo, [user_name]);
    if (userInfo.rowCount === 1) {
        return userInfo.rows[0];
    } else {
        return false;
    }
}

async function createUser(user_name, user_type) {
    const date_created = new Date();
    const isCreated = await query(sqlCreateUser, [user_name, user_type, date_created]);
    if (isCreated.rowCount === 1) {
        return {
            user_name,
            user_type,
            date_created,
        };
    } else {
        return false;
    }
}

async function getUserInfoList() {
    const list = await query(sqlGetUserInfoList, []);
    if (list.rowCount > 0) {
        return list.rows;
    } else {
        return false;
    }
}
module.exports = {
    getUserInfo,
    getUserInfoList,
    createUser,
};
