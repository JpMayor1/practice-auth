import "source-map-support/register";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import http from "http";
import morgan from "morgan";

import initDB from "@/db/db.connect.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { globalRateLimiter } from "./middlewares/limit.middleware";

import authRoute from "@/routes/auth/auth.route";
import csrfRoute from "@/routes/csrf/csrf.route";
import verifierRoute from "@/routes/verifier/verifier.route";

const bootstrap = async () => {
  const app = express();
  app.set("trust proxy", 1);

  const PORT = process.env.PORT || 5000;
  const allowedOrigins = process.env.FRONTEND_URLS
    ? JSON.parse(process.env.FRONTEND_URLS)
    : [];

  // CORS
  app.use(
    cors({
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error("CORS not allowed"), false);
        }
      },
      credentials: true,
    })
  );

  // Rate limiting
  app.use(globalRateLimiter);

  // Logger
  app.use(morgan("dev"));

  // JSON parser
  app.use(express.json());

  // Prevent NoSQL Injection
  app.use(mongoSanitize());

  // Cookie parser
  app.use(cookieParser());

  // CSRF protection
  const csrfProtection = csrf({
    cookie: {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  });
  app.use(csrfProtection);

  // Log IP
  app.use((req, res, next) => {
    console.log("Client IP:", req.ip);
    next();
  });

  // Root
  app.get("/", (req, res) => {
    res.status(200).send("API is running");
  });

  // Routes
  app.use("/api/csrf-token", csrfRoute);
  app.use("/api/verifier", verifierRoute);
  app.use("/api/auth", authRoute);

  // Error handler
  app.use(globalErrorHandler);

  const server = http.createServer(app);
  server.setTimeout(300000);

  server.listen(PORT, () => {
    initDB();
    console.log(`Server Running on port ${PORT}`);
  });
};

bootstrap().catch((e) => {
  console.error("Fatal boot error:", e);
  process.exit(1);
});
