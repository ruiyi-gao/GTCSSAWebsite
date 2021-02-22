import express from "express";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { configDir, dataDir, projectDir } from "./const";
import * as env from "./env";

env.loadEnv();

import { authMiddleware } from "./authMiddleware";
import { logger } from "./log";

const app = express();

logger.info(`CSSA Backend Server bootstrapping...`);
logger.debug(`ProjectDir is ${projectDir}`);
logger.debug(`ConfigDir is ${configDir}`);
logger.debug(`DataDir is ${dataDir}`);

app.use(helmet());
app.use(cookieParser(env.env.COOKIE_SIGNING_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/protected/", authMiddleware, express.static(path.join(projectDir, "protected")));
app.get("/", express.static(path.join(projectDir, "public")));

logger.debug(`Listening at port ${env.listenPort}...`);

app.listen(env.listenPort);

logger.info(`Bootstrap done. Server running at port ${env.listenPort}.`);
