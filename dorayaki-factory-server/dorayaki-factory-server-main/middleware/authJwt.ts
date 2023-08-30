import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/token';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      error: 'No token provided!',
    });
  }

  verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(401).send({
        error: 'Unauthorized!',
      });
    }

    next();
  });
};

export default verifyToken;
