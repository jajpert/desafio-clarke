import type { User } from "types/session.types.ts";

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}