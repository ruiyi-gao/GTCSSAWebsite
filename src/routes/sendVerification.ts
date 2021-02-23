import type { RequestHandler } from "express";
import { signLink } from "../auth/protectedLinks";
import { getRequestBaseUrl } from "../utils/requestTools";

const emailValidationRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@gatech\.edu$/i;

export const sendVerification: RequestHandler = ((req, res) => {
    let email = req.query.mail,
        recaptchaResponse = req.query.recaptchaResponse,
        userRemoteIp = req.ip;

    if (typeof email !== "string" || typeof recaptchaResponse !== "string") {
        return res.json({
            error: "invalid-params",
            message: "Something went wrong...",
            userRemoteIp
        });
    }

    if (!emailValidationRegex.test(email)) {
        return res.json({
            error: "invalid-params",
            message: "The email address you entered is invalid.",
            userRemoteIp
        });
    }

    let redirectionUrl = `${getRequestBaseUrl(req)}/verification_redirect`;
    let linkExpiration = new Date(Date.now() + 1.8e+6); // 30 minutes expiration

    let signedLink = signLink(redirectionUrl, {
        type: "one-off",
        resource: "email-protected-resources",
        expiration: linkExpiration
    });

    res.json({
        signedLink, linkExpiration, email, userRemoteIp, message: "A verification link has been sent to your GeorgiaTech mailbox."
    });
});
