import express from "express";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { configDir, dataDir, isProduction, projectDir } from "./const";
import * as env from "./env";

env.loadEnv();

import { authMiddleware } from "./authMiddleware";
import { logger } from "./log";
import { sendVerification } from "./routes/sendVerification";
import { verifyEmail } from "./routes/verifyEmail";

const app = express();

logger.info(`CSSA Backend Server bootstrapping...`);
logger.debug(`ProjectDir is ${projectDir}`);
logger.debug(`ConfigDir is ${configDir}`);
logger.debug(`DataDir is ${dataDir}`);

app.set("trust proxy", true);

app.use(helmet({
    hsts: isProduction ? undefined : false,
    contentSecurityPolicy: false // Ummmm, may need to update this in the future...
}));

app.use(cookieParser(env.env.COOKIE_SIGNING_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const staticResOptions = {
    extensions: [ "html", "htm" ]
};

app.use("/send_verification", sendVerification);
app.use("/verification_redirect", verifyEmail);

app.use("/protected/", authMiddleware, express.static(path.join(projectDir, "protected"), staticResOptions));
app.use(express.static(path.join(projectDir, "public"), staticResOptions));

logger.debug(`Listening at port ${env.listenPort}...`);

app.listen(env.listenPort);

logger.info(`Bootstrap done. Server running at port ${env.listenPort}.`);
