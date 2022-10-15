import connection from '../database/database.js';

async function getUser(email) {
    return connection.query(`
        SELECT * FROM users WHERE email=$1
    ;`, [email]);
}

async function insertNewUser(name, email, encryptedPassword) {
    return connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    ;`, [name, email, encryptedPassword]);
}

async function checkSession(user) {
    return connection.query(`
        SELECT
            sessions.*,
            users.email
        FROM sessions
        JOIN users ON sessions."userId"=users.id
        WHERE users.email=$1
    ;`, [user.rows[0].email]);
}

async function insertNewSession(user, token) {
    return connection.query(`
        INSERT INTO sessions ("userId", token) VALUES ($1, $2)
    ;`, [user.rows[0].id, token]);
}

async function listUserData(token) {
    return connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(visits."urlId") as "visitCount"
        FROM users
        LEFT JOIN sessions ON users.id=sessions."userId"
        LEFT JOIN urls ON users.id=urls."userId"
        LEFT JOIN visits ON urls.id=visits."urlId"
        WHERE token=$1
        GROUP BY users.id
    ;`, [token]);
}

async function listUserUrls(userData) {
    return connection.query(`
        SELECT 
            urls.id,
            urls."shortUrl",
            urls.url,
            COUNT(visits."urlId") as "visitCount"
        FROM urls
        LEFT JOIN visits ON urls.id=visits."urlId"
        WHERE "userId"=$1
        GROUP BY urls.id
    ;`, [userData.rows[0].id]);
}

export { getUser, insertNewUser, checkSession, insertNewSession, listUserData, listUserUrls }