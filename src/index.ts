import express, { Response, NextFunction } from "express";
import session from "express-session";
import rateLimit from "express-rate-limit";
import responseTime from "response-time";
import winston from "winston";
import expressWinston from "express-winston";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
dotenv.config();

const app = express();
const port = 3000;

const secret = process.env.SESSION_SECRET as string;
const store = new session.MemoryStore();
const protect = (req: any, res: Response, next: NextFunction) => {
  const { authenticated } = req.session;
  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

app.use(cors());
app.use(helmet());

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(responseTime());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    statusLevels: true,
    meta: true,
    msg: "Http {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    expressFormat: true,
    ignoreRoute() {
      return false;
    },
    colorize: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
  })
);

app.use(
  "/search",
  createProxyMiddleware({
    target: "http://api.duckduckgo.com/",
    changeOrigin: true,
    pathRewrite: {
      [`^/search`]: "",
    },
  })
);

app.get("/", (req, res) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
});

app.get("/login", (req: any, res) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    req.session.authenticated = true;
    res.send("Successfully authenticated");
  } else {
    res.send("Already authenticated");
  }
});

app.get("/logout", protect, (req, res) => {
  req.session.destroy(() => {
    res.send("Successfully logged out");
  });
});

app.get("/protected", protect, (req, res) => {
  const { name = "user" } = req.query;
  setTimeout(() => {
    res.send(`Hello ${name}!`);
  }, 200);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
