import { stripHtml } from 'string-strip-html';
import connection from '../database/database.js';
import { nanoid } from 'nanoid/async';

export async function shortenUrl(req, res) {
    const authorization = stripHtml(req.headers.authorization).result;
    const url = stripHtml(req.body.url).result;
    const token = authorization?.replace('Bearer ', '');

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