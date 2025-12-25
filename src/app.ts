import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";

import { configurePassport } from "./config/passport.ts";
import authRoutes from "./routes/authRoutes.ts";
import indexRoutes from "./routes/indexRoutes.ts";

const app = express();

// for views
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.set("trust proxy", true);

// conversion middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "saml-demo-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
        },
    }),
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/", authRoutes);

export default app;
