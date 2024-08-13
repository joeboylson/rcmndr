import { IsAuthenticated } from "@shared/types";
import { AccessToken } from "@spotify/web-api-ts-sdk";

/**
 * Augment express-session with a custom SessionData object
 */
declare module "express-session" {
  interface SessionData {
    isAuthenticated?: IsAuthenticated;
    accessTokenData?: AccessToken;
    expirationDateInMs?: number;
  }
}
