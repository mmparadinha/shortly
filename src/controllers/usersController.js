import { stripHtml } from 'string-strip-html';
import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

export async function signUpUser(req, res) {
    const name = stripHtml(req.body.name.trim()).result;
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const emailExists = await connection.query(`
            SELECT * FROM users WHERE email=$1
        ;`, [email]);
        if (emailExists.rows[0]) { return res.sendStatus(409) };

        await connection.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        ;`, [name, email, encryptedPassword]);
        return res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function signInUser(req, res) {
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;
  
    try {
        const user = await connection.query(`
            SELECT * FROM users WHERE email=$1
        ;`, [email]);
        if (!user.rows[0]) { return res.sendStatus(401) };

        const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);
  
        if (user && passwordCheck) {
            const session = await connection.query(`
                SELECT
                    sessions.*,
                    users.email
                FROM sessions
                JOIN users ON sessions."userId"=users.id
                WHERE users.email=$1
            ;`, [user.rows[0].email]);
    
            if (session.rows[0]) {
                return res.status(200).send({
                    token: session.rows[0].token
                });
            } else {
                const token = uuid();
                await connection.query(`
                    INSERT INTO sessions ("userId", token) VALUES ($1, $2)
                ;`, [user.rows[0].id, token]);
                return res.status(200).send({
                    token
                });
            }
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function listUser(req, res) {
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const userData = await connection.query(`
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
        if (!userData.rows[0]) { return res.sendStatus(404) }

        const userUrls = await connection.query(`
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

        return res.status(200).send({
            ...userData.rows[0],
            shortenedUrls: userUrls.rows
        });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}