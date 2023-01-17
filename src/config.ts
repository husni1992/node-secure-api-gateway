import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = 3000;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
export const requestRateConf = {
  windowMs: 5 * 60 * 1000,
  max: 100,
};

interface Proxy {
  [key: string]: {
    isProtected: boolean;
    target: string;
    changeOrigin: boolean;
    pathRewrite: {
      [key: string]: "";
    };
  };
}

export const proxies: Proxy = {
  "/search": {
    isProtected: true,
    target: "http://api.duckduckgo.com/",
    changeOrigin: true,
    pathRewrite: {
      [`^/search`]: "",
    },
  },
};
