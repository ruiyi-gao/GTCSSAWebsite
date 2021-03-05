import type { RequestHandler } from "express";
import { decodeAndUseLink } from "../auth/protectedLinks";
import { getRequestFullUrl } from "../utils/requestTools";

const redirectionResourcePath = "/protected/qrcode.html"
const validationFailResourcePath = "/"

export const verifyEmail: RequestHandler = ((req, res) => {
    const fullRequestUrl = getRequestFullUrl(req);
    const decodedParams = decodeAndUseLink(fullRequestUrl, "email-protected-resources");

    if (decodedParams && (+decodedParams.expiration) > Date.now()) {
        const validationInfo = JSON.stringify({
            validationDate: Date.now(),
            validated: true
        });
        res.cookie("validation-info", validationInfo, { signed: true });
        res.redirect(301, redirectionResourcePath);
    } else {
        res.redirect(302, validationFailResourcePath);
    }
});
