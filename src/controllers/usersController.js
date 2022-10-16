import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import * as usersRepository from '../repositories/usersRepository.js';
import * as controllerHelper from './controllerHelper.js';

export async function signUpUser(req, res) {
    const name = stripHtml(req.body.name.trim()).result;
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const emailExists = await usersRepository.getUser(email);
        if (emailExists.rows[0]) { return controllerHelper.conflictResponse(res); }

        await usersRepository.insertNewUser(name, email, encryptedPassword);
        return controllerHelper.createdResponse(res);

    } catch (err) {
        controllerHelper.serverError(res, err);
    }
}

export async function signInUser(req, res) {
    const email = stripHtml(req.body.email.trim()).result;
    const password = stripHtml(req.body.password.trim()).result;

    try {
        const user = await usersRepository.getUser(email);
        if (!user.rows[0]) { return controllerHelper.unauthorizedResponse(res); }

        const passwordCheck = bcrypt.compareSync(password, user.rows[0].password);

        if (user && passwordCheck) {
            const session = await usersRepository.checkSession(user);

            if (session.rows[0]) {
                const body = {
                    token: session.rows[0].token,
                    username: user.rows[0].name
                };

                return controllerHelper.successResponse(res, body);

            } else {
                const token = uuid();
                await usersRepository.insertNewSession(user, token);
                const body = {
                    token
                };

                return controllerHelper.successResponse(res, body);

            }
        } else {
            return controllerHelper.unauthorizedResponse(res);
        }
    } catch (error) {
        controllerHelper.serverError(res, err);
    }
}

export async function listUser(req, res) {
    const { authorization } = req.headers;
    if (!authorization) { return controllerHelper.unauthorizedResponse(res); }

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const userData = await usersRepository.listUserData(token);
        if (!userData.rows[0]) { return controllerHelper.notFoundResponse(res); }

        const userUrls = await usersRepository.listUserUrls(userData);
        const body = {
            ...userData.rows[0],
            shortenedUrls: userUrls.rows
        };

        return controllerHelper.successResponse(res, body);

    } catch (error) {
        controllerHelper.serverError(res, err);
    }
}