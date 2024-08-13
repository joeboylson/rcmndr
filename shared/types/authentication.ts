import { User } from "@spotify/web-api-ts-sdk";

export interface IsAuthenticated {
  authenticated: boolean;
  user: User;
}
