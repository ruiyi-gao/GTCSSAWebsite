import { EnvType, load } from 'ts-dotenv';
import * as path from "path";
import { configDir } from "./const";

export type Env = EnvType<typeof schema>;

export const schema = {
    COOKIE_SIGNING_SECRET: String,
    SENDGRID_API_KEY: String,
    RECAPTCHA_SITE_KEY: String,
    RECAPTCHA_SECRET: String,
    CSSA_LINK_SIGNING_SECRET: String,
};

export let env: Env;
export let listenPort: number;

export function loadEnv(): void {
    env = load(schema, {
        path: path.join(configDir, ".env")
    });

    // Port specified by env
    listenPort = parseInt(process.env.CSSA_SERVER_PORT ?? "") ?? 80;
}
