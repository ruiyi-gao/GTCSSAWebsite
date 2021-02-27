import type { RequestHandler } from "express";
import { signLink } from "../auth/protectedLinks";
import { getRequestBaseUrl } from "../utils/requestTools";
import sgMail from "@sendgrid/mail";
import { env } from "../env";
import * as fs from "fs";
import * as path from "path";
import { templateDir } from "../const";
import ejs from "ejs";
import { error } from "winston";
import { logger } from "../log";

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

    let signedVerificationLink = signLink(redirectionUrl, {
        type: "one-off",
        resource: "email-protected-resources",
        expiration: linkExpiration
    });

    sgMail.setApiKey(env.SENDGRID_API_KEY);

    const emailTemplate = fs.readFileSync(path.join(templateDir, "verification_email.ejs"), "utf-8");
    const renderedEmailHtml = ejs.render(emailTemplate, {
        signedVerificationLink, linkExpiration
    });

    const verificationEmailContent = {
        to: email,
        from: "verification@gtcssa.org",
        subject: "GT CSSA 官方专业群验证",
        text: `请使用以下链接访问 CSSA 专业群: ${signedVerificationLink}`,
        html: renderedEmailHtml
    }

    logger.info(`Verification link generated. Sending verification email to user at ${userRemoteIp}...`);

    sgMail.send(verificationEmailContent)
        .then(() => {
            logger.debug(`Verification email sent to user ${userRemoteIp}`);
            res.json({
                linkExpiration, email, userRemoteIp, message: "请查看你的GT邮箱。如果5分钟内没有收到邮件请重试。"
            });
        }, error => {
            logger.error(`Unable to send verification link to user ${userRemoteIp} because of error: ${error.response.body}`);
            res.json({
                error: "internal-error",
                message: "系统故障，无法发送邮件。请联系CSSA技术部。"
            });
        });
});
