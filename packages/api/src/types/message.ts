export type AcknowledgementsPayload = {
  message_id: string;
  status: string;
}[];

export type AcknowledgementsResp = {
  message_id: string;
  status: string;
}[];

export enum MessageCategory {
  PLAIN_TEXT = "PLAIN_TEXT",
  PLAIN_STICKER = "PLAIN_STICKER",
  PLAIN_IMAGE = "PLAIN_IMAGE",
  PLAIN_AUDIO = "PLAIN_AUDIO",
  PLAIN_VIDEO = "PLAIN_VIDEO",
  PLAIN_CONTACT = "PLAIN_CONTACT",
  APP_CARD = "APP_CARD",
  PLAIN_DATA = "PLAIN_DATA",
  PLAIN_LIVE = "PLAIN_LIVE",
  PLAIN_LOCATION = "PLAIN_LOCATION",
  PLAIN_POST = "PLAIN_POST",
  APP_BUTTON_GROUP = "APP_BUTTON_GROUP",
  SYSTEM_ACCOUNT_SNAPSHOT = "SYSTEM_ACCOUNT_SNAPSHOT",
  MESSAGE_PIN = "MESSAGE_PIN"
}

export interface StickerData {
  sticker_id: string;
}

export interface ImageData {
  attachment_id: string;
  mime_type: string;
  width: number;
  height: number;
  size: number;
  thumbnail: string;
}

// TODO: ccomplete this
export type AudioData = any;

export interface VideoData {
  attachment_id: string;
  mime_type: string;
  width: number;
  height: number;
  size: number;
  duration: number;
  thumbnail: string;
}

export interface ContactData {
  user_id: string;
}

export interface CardData {
  app_id: string;
  icon_url: string;
  title: string; // 1 <= size(title) <= 36
  description: string; // 1 <= size(description) <= 128
  action: string;
  shareable: boolean;
}

export interface FileData {
  attachment_id: string;
  mime_type: string;
  size: number;
  name: string;
}

export interface LiveData {
  width: number;
  height: number;
  thumb_url: string;
  url: string;
}

export interface LocationData {
  longitude: number;
  latitude: number;
  name: string;
  address: string;
}

export type ButtonsData = {
  label: string;
  color: string;
  action: string;
}[];

export interface TransferData {
  type: string;
  snapshot_id: string;
  opponent_id: string;
  asset_id: string;
  amount: string;
  trace_id: string;
  memo: string;
  created_at: string;
}

export interface PinData {
  action: "PIN" | "UNPIN";
  message_ids: string[];
}

export type MessageData =
  | string
  | StickerData
  | ImageData
  | AudioData
  | VideoData
  | ContactData
  | CardData
  | FileData
  | LiveData
  | LocationData
  | ButtonsData
  | TransferData
  | PinData;

export interface CreateMessagePayload {
  id: string;
  action: "CREATE_MESSAGE";
  params: {
    conversation_id: string;
    category: MessageCategory;
    status: string;
    message_id: string;
    data: MessageData;
  };
}

export interface UploadAttachmentPayload {
  // Just leave them empty.
  attachment_id: string;
  upload_url: string;
  view_url: string;
}

export interface Attachment {
  type: string;
  attachment_id: string;
  // the url to view the attachment
  view_url: string;
  // the url to upload the attachment
  upload_url: string;
}
