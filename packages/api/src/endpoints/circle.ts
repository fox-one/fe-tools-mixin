import {
  HttpMethod,
  ProviderInterface,
  PaginationParams,
  Circle,
  CreateCirclePayload,
  UpdateCirclePayload,
  AddUserToCirclePayload,
  RemoveUserFromCirclePayload,
  AddConversationCirclePayload,
  RemoveConversationCirclePayload
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    addConversationCircle(id: string, body: AddConversationCirclePayload) {
      return provider.send(
        `/conversation/${id}/circles`,
        HttpMethod.POST,
        body
      );
    },

    addUserToCircle(id: string, body: AddUserToCirclePayload) {
      return provider.send(`/users/${id}/circles`, HttpMethod.POST, body);
    },

    createCircle(body: CreateCirclePayload) {
      return provider.send("/circles", HttpMethod.POST, body);
    },

    deleteCircle(id: string) {
      return provider.send(`/circles/${id}/delete`, HttpMethod.POST);
    },

    getCircle(id: string): Promise<Circle> {
      return provider.send(`/circles/${id}`, HttpMethod.GET);
    },

    getCircleConversations(id: string, params: PaginationParams) {
      return provider.send(
        `/circles/${id}/conversations`,
        HttpMethod.GET,
        "",
        params
      );
    },

    getCircles(): Promise<Circle[]> {
      return provider.send("/circles", HttpMethod.GET);
    },

    removeConversationCircle(
      id: string,
      body: RemoveConversationCirclePayload
    ) {
      return provider.send(
        `/conversation/${id}/circles`,
        HttpMethod.POST,
        body
      );
    },

    removeUserFromCircle(id: string, body: RemoveUserFromCirclePayload) {
      return provider.send(`/users/${id}/circles`, HttpMethod.POST, body);
    },

    updateCircle(id: string, body: UpdateCirclePayload) {
      return provider.send(`/circles/${id}`, HttpMethod.POST, body);
    }
  };
}
