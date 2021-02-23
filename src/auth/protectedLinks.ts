import { URL } from "url";
import crypto from "crypto";
import { env } from "../env";
import { createOneOffToken } from "../db";

export interface ProtectedLinkParams {
    type: "one-off" | "permanent";
    resource: string;
    expiration: Date;
}

function makeSalt() {
    return crypto.randomBytes(8).toString("hex");
}

export const signLink = (link: string, opts: ProtectedLinkParams): string => {
    let url = new URL(link);
    let hmac = crypto.createHmac("sha256", env.CSSA_LINK_SIGNING_SECRET);
    let salt = makeSalt();

    url.searchParams.append("type", opts.type);
    url.searchParams.append("salt", salt);
    url.searchParams.append("expire", String(opts.expiration.getTime()));

    hmac.update(opts.type);
    hmac.update(opts.resource);
    hmac.update(String(opts.expiration.getTime()));
    hmac.update(salt);

    if (opts.type === "one-off") {
        let token = createOneOffToken(opts.resource);
        hmac.update(token);
        url.searchParams.append("token", token);
    }

    let digest = hmac.digest().toString("hex");
    url.searchParams.append("verifier", digest);

    return url.href;
};

export const decodeAndUseLink = (link: string, resource: string): ProtectedLinkParams|undefined => {
    return undefined;
}
