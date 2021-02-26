import type { RequestHandler } from "express";

const authFailRedirectionLocation = "/";

export const authMiddleware: RequestHandler = ((req, res, next) => {
    if (req.signedCookies && req.signedCookies["validation-info"]) {
        const validationInfo = JSON.parse(req.signedCookies["validation-info"]) as {
            validationDate: number,
            validated: boolean
        };

        if (validationInfo.validated && validationInfo.validationDate < Date.now()) {
            return next();
        }
    }

    res.redirect(302, authFailRedirectionLocation);
});
