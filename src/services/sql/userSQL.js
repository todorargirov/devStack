module.exports = {
    sqlGetUserInfo:
        'SELECT user_name, user_type, date_created, date_updated, date_deleted from ff_users where user_name=$1',

    sqlCreateUser:
        'INSERT INTO ff_users (user_name, user_type, date_created, date_updated, date_deleted) VALUES ($1,$2,$3,null,null)',

    sqlGetUserInfoList:
        'SELECT user_name, user_type, date_created, date_updated, date_deleted from ff_users',
};
