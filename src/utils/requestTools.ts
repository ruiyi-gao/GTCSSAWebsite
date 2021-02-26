import type { Request } from "express";

export const getRequestBaseUrl = (req: Request) => (`${req.protocol}://${req.get("host")}`);
export const getRequestFullUrl = (req: Request) => (`${getRequestBaseUrl(req)}${req.originalUrl}`);
