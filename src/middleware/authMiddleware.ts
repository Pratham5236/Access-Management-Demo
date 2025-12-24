import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

// future maybe add different middleware for different auth types
