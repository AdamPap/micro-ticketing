import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@adamptickets/common";
import { createChargeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
