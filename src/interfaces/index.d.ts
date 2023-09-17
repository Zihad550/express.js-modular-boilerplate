import { JwtPayload } from 'jsonwebtoken';
// TODO: update as needed
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
