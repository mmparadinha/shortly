import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import * as usersRepository from '../repositories/usersRepository.js';

export async function signUpUser(req, res) {
    const name = stripHtml(req.body.name.trim()).result;
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const emailExists = await usersRepository.getUser(email);
        if (emailExists.rows[0]) { return res.sendStatus(409) };

        await usersRepository.insertNewUser(name, email, encryptedPassword);
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
        const user = await usersRepository.getUser(email);
        if (!user.rows[0]) { return res.sendStatus(401) };

        const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);
  
        if (user && passwordCheck) {
            const session = await usersRepository.checkSession(user);
    
            if (session.rows[0]) {
                return res.status(200).send({
                    token: session.rows[0].token
                });
            } else {
                const token = uuid();
                await usersRepository.insertNewSession(user, token);
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
        const userData = await usersRepository.listUserData(token);
        if (!userData.rows[0]) { return res.sendStatus(404) }

        const userUrls = await usersRepository.listUserUrls(userData);

        return res.status(200).send({
            ...userData.rows[0],
            shortenedUrls: userUrls.rows
        });

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}