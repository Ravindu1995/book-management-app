import { JwtPayload } from "jsonwebtoken";

//recheck
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}
