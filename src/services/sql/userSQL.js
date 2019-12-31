module.exports = {
    sqlGetUserInfo:
        'SELECT user_name, user_type, date_created, date_updated, date_deleted from ff_users where user_name=$1',
};
