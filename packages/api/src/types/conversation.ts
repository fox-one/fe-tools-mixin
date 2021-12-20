export interface Participant {
  type: string;
  user_id: string;
  role: string;
  created_at: string;
}

export interface ParticipantSession {
  user_id: string;
  session_id: string;
}

export interface Conversation {
  type: string;
  conversation_id: string;
  creator_id: string;
  category: string;
  name: string;
  icon_url: string;
  announcement: string;
  created_at: string;
  code_id: string;
  code_url: string;
  mute_until: string;
  participants: Participant[];
  participant_sessions: ParticipantSession[];
  circles: {
    circle_id: string;
    conversation_id: string;
    user_id: string;
    created_at: string;
  }[];
}

export interface CreateConversationPayload {
  category: string;
  conversation_id: string;
  name: string;
  participants: string;
}

export interface UpdateConversationPayload {
  name: string;
  announcement: string;
}

export type AddParticipantsPayload = {
  user_id: string;
}[];

export type RemoveParticipantsPayload = {
  user_id: string;
}[];

export type UpdateConversationRolePayload = { user_id: string; role: string }[];

export interface MuteConversationPayload {
  duration: number;
  category?: string;
  participants?: string;
}
