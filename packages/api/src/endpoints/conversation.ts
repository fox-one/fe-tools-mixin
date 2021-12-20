import {
  HttpMethod,
  ProviderInterface,
  Conversation,
  CreateConversationPayload,
  UpdateConversationPayload,
  AddParticipantsPayload,
  RemoveParticipantsPayload,
  UpdateConversationRolePayload,
  MuteConversationPayload
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    addParticipants(id: string) {
      return provider.send(
        `/conversations/${id}/participants/ADD`,
        HttpMethod.POST
      );
    },

    createConversation(body: CreateConversationPayload): Promise<Conversation> {
      return provider.send("/conversations", HttpMethod.POST, body);
    },

    exitConversation(id: string) {
      return provider.send(`/conversations/${id}/exit`, HttpMethod.POST);
    },

    getConversation(id: string): Promise<Conversation> {
      return provider.send(`/conversation/${id}`, HttpMethod.GET);
    },

    joinConversation(codeId: string, body: AddParticipantsPayload) {
      return provider.send(
        `/conversations/${codeId}/join`,
        HttpMethod.POST,
        body
      );
    },

    muteConversation(id: string, body: MuteConversationPayload) {
      return provider.send(`/conversations/${id}/mute`, HttpMethod.POST, body);
    },

    removeParticipants(id: string, body: RemoveParticipantsPayload) {
      return provider.send(
        `/conversations/${id}/participants/REMOVE`,
        HttpMethod.POST,
        body
      );
    },

    rotateConversation(id: string) {
      return provider.send(`/conversations/${id}/rotate`, HttpMethod.POST);
    },

    updateConversation(
      id: string,
      body: UpdateConversationPayload
    ): Promise<Conversation> {
      return provider.send(`/conversation/${id}`, HttpMethod.POST, body);
    },

    updateConversationRole(
      id: string,
      body: UpdateConversationRolePayload
    ): Promise<Conversation> {
      return provider.send(
        `/conversation/${id}/participants/ROLE`,
        HttpMethod.POST,
        body
      );
    }
  };
}
