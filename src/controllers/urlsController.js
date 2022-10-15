import { stripHtml } from 'string-strip-html';
import { nanoid } from 'nanoid/async';
import * as urlsRepository from '../repositories/urlsRepository.js';

export async function shortenUrl(req, res) {
    const url = stripHtml(req.body.url).result;
    const { authorization } = req.headers;
    if (!authorization) { return res.sendStatus(401) };

    const token = stripHtml(authorization.replace('Bearer ', '')).result;

    try {
        const loggedIn = await urlsRepository.getSessions(token);
        if (!loggedIn.rows[0]) { return res.sendStatus(401) };

        const shortUrl = await nanoid();

        await urlsRepository.insertNewUrl(loggedIn, url, shortUrl);
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
        const urlData = await urlsRepository.getUrl(id);
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
        const originalUrl = await urlsRepository.getRedirection(shortUrl);
        if (!originalUrl.rows[0]) { return res.sendStatus(404) };

        await urlsRepository.insertVisit(originalUrl);
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
        const urlExists = await urlsRepository.getUrl(id);
        if (!urlExists.rows[0]) { return res.sendStatus(404) };

        const urlOwner = await urlsRepository.checkUrlOwner(id, token);
        if (!urlOwner.rows[0]) { return res.sendStatus(401) };

        await urlsRepository.removeUrl(id);
        return res.sendStatus(204);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getRankings(req, res) {
    try {
        const ranking = await urlsRepository.listRankings();
        if (!ranking.rows[0]) { return res.sendStatus(404) }

        return res.status(200).send(ranking.rows);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}