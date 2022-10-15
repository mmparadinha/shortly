import connection from '../database/database.js';

async function getSessions(token) {
    return connection.query(`
        SELECT * FROM sessions WHERE token=$1
    ;`, [token]);
}

async function insertNewUrl(loggedIn, url, shortUrl) {
    return connection.query(`
        INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
    ;`, [loggedIn.rows[0].userId, url, shortUrl]);
}

async function getUrl(id) {
    return connection.query(`
        SELECT
            urls.id,
            urls."shortUrl",
            urls.url
        FROM urls
        WHERE id=$1
    ;`, [id]);
}

async function getRedirection(shortUrl) {
    return connection.query(`
        SELECT
            urls.id,
            urls.url
        FROM urls
        WHERE "shortUrl"=$1
    ;`, [shortUrl]);
}

async function insertVisit(originalUrl) {
    return connection.query(`
        INSERT INTO visits ("urlId") VALUES ($1)
    ;`, [originalUrl.rows[0].id]);
}

async function checkUrlOwner(id, token) {
    return connection.query(`
        SELECT 
            urls.id,
            urls."userId",
            sessions.token
        FROM urls
        JOIN sessions ON urls."userId"=sessions.id
        WHERE urls."userId"=$1 AND sessions.token=$2
    ;`, [id, token]);
}

async function removeUrl(id) {
    return connection.query(`
        DELETE FROM urls WHERE id=$1
    `, [id]);
}

async function listRankings() {
    return connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(DISTINCT urls.id) as "linksCount",
            COUNT(visits.id) as "visitCount"
        FROM users
        LEFT JOIN sessions ON users.id=sessions."userId"
        LEFT JOIN urls ON users.id=urls."userId"
        LEFT JOIN visits ON urls.id=visits."urlId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
    ;`);
}

export { getSessions, insertNewUrl, getUrl, getRedirection, insertVisit, checkUrlOwner, removeUrl, listRankings }