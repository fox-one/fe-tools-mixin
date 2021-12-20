export interface Circle {
  circle_id: string;
  name: string;
  created_at: string;
}

export interface CreateCirclePayload {
  name: string;
}

export interface UpdateCirclePayload {
  name: string;
}

export interface AddUserToCirclePayload {
  circle_id: string;
  action: "ADD";
}

export interface RemoveUserFromCirclePayload {
  circle_id: string;
  action: "REMOVE";
}

export interface AddConversationCirclePayload {
  circle_id: string;
  action: "ADD";
}

export interface RemoveConversationCirclePayload {
  circle_id: string;
  action: "REMOVE";
}
