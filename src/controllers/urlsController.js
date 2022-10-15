import { stripHtml } from 'string-strip-html';
import connection from '../database/database.js';
import { nanoid } from 'nanoid/async';

export async function shortenUrl(req, res) {
    const url = stripHtml(req.body.url).result;
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const loggedIn = await connection.query(`
            SELECT * FROM sessions WHERE token=$1
        ;`, [token]);
        if (!loggedIn.rows[0]) { return res.sendStatus(401) };

        const shortUrl = await nanoid();

        await connection.query(`
           INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)
        ;`, [loggedIn.rows[0].userId, url, shortUrl]);
        return res.status(201).send({
            shortUrl
        });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function listSingleUrl(req, res) {
    const { id } = req.params;

    try {
        const urlData = await connection.query(`
            SELECT
                urls.id,
                urls."shortUrl",
                urls.url
            FROM urls
            WHERE id=$1
        ;`, [id]);
        if (!urlData.rows[0]) { return res.sendStatus(404) };

        return res.status(200).send(urlData.rows[0]);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const originalUrl = await connection.query(`
            SELECT
                urls.id,
                urls.url
            FROM urls
            WHERE "shortUrl"=$1
        ;`, [shortUrl]);
        if (!originalUrl.rows[0]) { return res.sendStatus(404) };

        await connection.query(`
           INSERT INTO visits ("urlId") VALUES ($1)
        ;`, [originalUrl.rows[0].id]);
        return res.redirect(originalUrl.rows[0].url);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const urlExists = await connection.query(`
            SELECT * FROM urls WHERE id=$1
        ;`, [id]);
        if (!urlExists.rows[0]) { return res.sendStatus(404) };

        const urlOwner = await connection.query(`
            SELECT 
                urls.id,
                urls."userId",
                sessions.token
            FROM urls
            JOIN sessions ON urls."userId"=sessions.id
            WHERE urls."userId"=$1 AND sessions.token=$2
        ;`, [id, token]);
        if (!urlOwner.rows[0]) { return res.sendStatus(401) };

        await connection.query(`
            DELETE FROM urls WHERE id=$1
        `, [id]);
        return res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getRankings(req, res) {
    try {
        const ranking = await connection.query(`
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
        if (!ranking.rows[0]) { return res.sendStatus(404) }

        return res.status(200).send(ranking.rows);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}