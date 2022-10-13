import { stripHtml } from 'string-strip-html';
import connection from '../database/database.js';
import bcrypt from 'bcrypt';

export async function signupUser(req, res) {
    const name = stripHtml(req.body.name.trim()).result;
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const emailExists = await connection.query(`
            SELECT * FROM users WHERE email=$1
        `, [email]);
        if (emailExists.rows[0]) { return res.sendStatus(409) };

        await connection.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, encryptedPassword]);
        return res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}