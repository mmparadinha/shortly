function serverError(res, error) {
    console.error(error);
    return res.sendStatus(500);
}

function notFoundResponse(res) {
    return res.sendStatus(404);
}

function unauthorizedResponse(res) {
    return res.sendStatus(401);
}

function conflictResponse(res) {
    return res.sendStatus(409);
}

function unprocessableEntityResponse(res, body) {
    return res.status(422).send(body);
}

function createdResponse(res, body) {
    if (body) {
        return res.status(201).send(body);
    } else {
        return res.sendStatus(201);
    }
}

function successResponse(res, body) {
    return res.status(200).send(body);
}

function doneResponse(res) {
    return res.sendStatus(204);
}

export { serverError, notFoundResponse, unauthorizedResponse, conflictResponse, unprocessableEntityResponse, createdResponse, successResponse, doneResponse };  