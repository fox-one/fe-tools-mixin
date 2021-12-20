export interface GetAccessTokenPayload {
  client_id: string; // "application's client_id"
  code: string; // "authorization code returned by the successful authorization callback"
  client_secret: string; // "application's app secret"
}

export interface GetAccessTokenResp {
  access_token: string; // "user authorization token";
  scope: string; // "list of permissions that the user has given, e.g. 'PROFILE:READ ASSETS:READ'";
}

export enum OAuthScope {
  PROFILE_READ = "PROFILE:READ",
  PHONE_READ = "PHONE:READ",
  ASSETS_READ = "ASSETS:READ",
  COLLECTIBLES_READ = "COLLECTIBLES:READ",
  CONTACTS_READ = "CONTACTS:READ",
  MESSAGES_REPRESENT = "MESSAGES:REPRESENT",
  SNAPSHOTS_READ = "SNAPSHOTS:READ",
  CIRCLES_READ = "CIRCLES:READ",
  CIRCLES_WRITE = "CIRCLES:WRITE"
}
