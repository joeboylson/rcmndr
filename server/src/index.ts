import express from "express";
import session, { SessionOptions } from "express-session";
import { authenticationRouter, setStaticFolder } from "./router";
import { devSessionMiddleware, isProduction } from "./utils";

/**
 * IMPORT TYPES SO ALL TYPE DECLARATIONS WILL APPLY
 */
import "./types";

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: { secure: isProduction() },
  resave: false,
  saveUninitialized: false,
};

app.use(express.json());
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true }));
app.use(devSessionMiddleware);

app.use("/api/auth", authenticationRouter);
setStaticFolder(app);

app.listen(SERVER_PORT, () => {
  console.info(`>>> ${SERVER_PORT}`);
});
