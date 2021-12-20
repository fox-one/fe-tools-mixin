export interface Profile {
  type: string;
  user_id: string;
  identity_number: string;
  phone: string;
  full_name: string;
  biography: string;
  avatar_url: string;
  relationship: string;
  mute_until: string;
  created_at: string;
  is_verified: boolean;
  is_scam: boolean;
  session_id: string;
  pin_token_base64: string;
  code_id: string;
  code_url: string;
  has_pin: boolean;
  device_status: string;
  has_emergency_contact: boolean;
  receive_message_source: string;
  accept_conversation_source: string;
  accept_search_source: string;
  fiat_currency: string;
  transfer_notification_threshold: number;
  transfer_confirmation_threshold: number;
}

export interface User {
  type: string;
  user_id: string;
  identity_number: string;
  phone: string;
  full_name: string;
  biography: string;
  avatar_url: string;
  relationship: string;
  mute_until: string;
  created_at: string;
  is_verified: boolean;
}

export type UpdateRelationshipPayload = AddRelationship | EditRelationship;

export interface AddRelationship {
  user_id: string;
  full_name: string;
  phone: string;
  action: "ADD";
}

export interface EditRelationship {
  user_id: string;
  action: "REMOVE" | "BLOCK" | "UNBLOCK";
}

export interface CreateUserPayload {
  session_secret: string; // Ed25519 Public Key in Base64;
  full_name: string; // display name;
}

export interface CreateUserResp {
  user_id: string; // User Id
  session_id: string; // Session Id
  pin_token: string; // PIN
  full_name: string; // Nickname
  biography: string; // Brief Intro
  avatar_url: string; // Avatar
  created_at: string; // Creation Timestamp
}

export type GetFavoriteAppResp = {
  type: string;
  user_id: string;
  app_id: string;
  created_at: string;
}[];

export interface UpdateProfilePayload {
  full_name: string;
  avatar_base64: string;
}
