import {
  HttpMethod,
  ProviderInterface,
  User,
  Profile,
  UpdateRelationshipPayload,
  CreateUserPayload,
  GetFavoriteAppResp,
  UpdateProfilePayload
} from "../types";

export default function (provider: ProviderInterface) {
  return {
    addAppToFavorite(id: string) {
      return provider.send(`/apps/${id}/favorite`, HttpMethod.POST);
    },

    codes(code: string) {
      return provider.send(`/codes/${code}`, HttpMethod.GET);
    },

    createUser(body: CreateUserPayload) {
      return provider.send("/users", HttpMethod.POST, body);
    },

    getBlockingUsers(): Promise<User[]> {
      return provider.send("/blocking_users", HttpMethod.GET);
    },

    getFriends(): Promise<User[]> {
      return provider.send("/friends", HttpMethod.GET);
    },

    getMe(): Promise<Profile> {
      return provider.send("/me", HttpMethod.GET);
    },

    getUser(id: string): Promise<User> {
      return provider.send(`/users/${id}`, HttpMethod.GET);
    },

    getUserFavoriteApps(id: string): Promise<GetFavoriteAppResp> {
      return provider.send(`/users/${id}/apps/favorite`, HttpMethod.GET);
    },

    getUsers(body: string[]): Promise<User[]> {
      return provider.send("/users/fetch", HttpMethod.POST, body);
    },

    removeAppFromFavorite(id: string) {
      return provider.send(`/apps/${id}/unfavorite`, HttpMethod.POST);
    },

    searchUser(str: string): Promise<User> {
      return provider.send(`/search/${str}`, HttpMethod.GET);
    },

    updateProfile(opts: UpdateProfilePayload) {
      return provider.send("/me", HttpMethod.POST, opts);
    },

    updateRelationship(body: UpdateRelationshipPayload): Promise<Profile> {
      return provider.send("/relationships", HttpMethod.POST, body);
    }
  };
}
