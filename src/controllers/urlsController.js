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
           INSERT INTO urls ("userId", "originalURL", "shortURL") VALUES ($1, $2, $3)
        ;`, [loggedIn.rows[0].userId, url, shortUrl]);
        return res.status(201).send({
            shortUrl
        });

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}