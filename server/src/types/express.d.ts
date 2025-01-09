declare namespace Express {
  export interface Request {
    user?: {
      username: string;
      role: string;
      [key: string]: any;
    };
  }
}
