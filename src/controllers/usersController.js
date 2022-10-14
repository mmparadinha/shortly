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