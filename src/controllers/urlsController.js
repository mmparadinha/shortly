import { stripHtml } from 'string-strip-html';
import { nanoid } from 'nanoid/async';
import * as urlsRepository from '../repositories/urlsRepository.js';
import * as controllerHelper from './controllerHelper.js';

export async function shortenUrl(req, res) {
    const url = stripHtml(req.body.url).result;
    const { authorization } = req.headers;
    if (!authorization) { return controllerHelper.unauthorizedResponse(res) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const loggedIn = await urlsRepository.getSessions(token);
        if (!loggedIn.rows[0]) { return controllerHelper.unauthorizedResponse(res) };

        const shortUrl = await nanoid();

        await urlsRepository.insertNewUrl(loggedIn, url, shortUrl);
        const body = {
            shortUrl
        };
        return controllerHelper.createdResponse(res, body)

    } catch (err) {
        controllerHelper.serverError(res, err);
    }
}

export async function listSingleUrl(req, res) {
    const { id } = req.params;

    try {
        const urlData = await urlsRepository.getUrl(id);
        if (!urlData.rows[0]) { return controllerHelper.notFoundResponse(res) };

        return controllerHelper.successResponse(res, urlData.rows[0]);

    } catch (err) {
        controllerHelper.serverError(res, err);
    }
}

export async function redirectUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const originalUrl = await urlsRepository.getRedirection(shortUrl);
        if (!originalUrl.rows[0]) { return controllerHelper.notFoundResponse(res) };

        await urlsRepository.insertVisit(originalUrl);
        return res.redirect(originalUrl.rows[0].url);

    } catch (err) {
        controllerHelper.serverError(res, err);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) { return controllerHelper.unauthorizedResponse(res) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const urlExists = await urlsRepository.getUrl(id);
        if (!urlExists.rows[0]) { return controllerHelper.notFoundResponse(res) };

        const urlOwner = await urlsRepository.checkUrlOwner(id, token);
        if (!urlOwner.rows[0]) { return controllerHelper.unauthorizedResponse(res) };

        await urlsRepository.removeUrl(id);
        return controllerHelper.doneResponse(res);

    } catch (err) {
        controllerHelper.serverError(res, err);
    }
}

export async function getRankings(req, res) {
    try {
        const ranking = await urlsRepository.listRankings();
        if (!ranking.rows[0]) { return controllerHelper.notFoundResponse(res) }

        return controllerHelper.successResponse(res, ranking.rows);

    } catch (error) {
        controllerHelper.serverError(res, err);
    }
}