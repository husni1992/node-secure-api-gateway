import { Response, NextFunction } from "express";

export const alwaysAllow = (_1, _2, next: NextFunction) => {
  next();
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const { authenticated } = req.session;
  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};
