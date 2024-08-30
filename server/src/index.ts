import express from "express";
import session, { SessionOptions } from "express-session";
import {
  authenticationRouter,
  playlistRouter,
  setStaticFolder,
  trackRouter,
} from "./router";
import { devSessionMiddleware, isProduction } from "./utils";

/**
 * IMPORT TYPES SO ALL TYPE DECLARATIONS WILL APPLY
 */
import "./types";

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET,
};

app.use(express.json());
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true }));
app.use(devSessionMiddleware);

app.use("/api/auth", authenticationRouter);
app.use("/api/track", trackRouter);
app.use("/api/playlist", playlistRouter);
setStaticFolder(app);

app.listen(SERVER_PORT, () => {
  console.info(`>>> ${SERVER_PORT}`);
});
