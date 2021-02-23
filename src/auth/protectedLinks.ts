import { URL } from "url";
import crypto from "crypto";
import { env } from "../env";
import { createOneOffToken, useOneOffToken } from "../db";

export type ProtectedLinkType = "one-off" | "permanent";

export interface ProtectedLinkParams {
    type: ProtectedLinkType;
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
    url.searchParams.append("expire", String(+opts.expiration));

    hmac.update(opts.type);
    hmac.update(opts.resource);
    hmac.update(String(+opts.expiration));
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
    const url = new URL(link);
    const type = url.searchParams.get("type") === "permanent" ? "permanent" : "one-off",
        salt = url.searchParams.get("salt"),
        token = url.searchParams.get("token"),
        verifier = url.searchParams.get("verifier"),
        expiration = new Date(parseInt(url.searchParams.get("expire") ?? "") ?? 0);

    // Not checking for expiration here!!
    if (typeof salt !== "string" || typeof verifier !== "string" || (type === "one-off" && typeof token !== "string")) {
        return undefined;
    }

    let hmac = crypto.createHmac("sha256", env.CSSA_LINK_SIGNING_SECRET);

    hmac.update(type);
    hmac.update(resource);
    hmac.update(String(+expiration));
    hmac.update(salt);

    if (token) {
        hmac.update(token);
    }

    let digest = hmac.digest().toString("hex");

    if (digest === verifier && (!token || useOneOffToken(resource, token))) {
        return {
            type, resource, expiration
        };
    }

    return undefined;
}
