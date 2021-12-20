export type ProviderInterfaceEmitted = "connected" | "disconnected" | "error";

export type ProviderInterfaceEmitCb = (value?: unknown) => unknown;

export type ProviderInterfaceCallback = (
  error: Error | null,
  result: unknown
) => void;

export enum HttpMethod {
  GET = "GET",
  POST = "POST"
}

export interface ProviderInterface {
  readonly hasSubscriptions: boolean;
  readonly isConnected: boolean;

  clone(): ProviderInterface;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  on(type: ProviderInterfaceEmitted, sub: ProviderInterfaceEmitCb): () => void;

  send<T>(path: string, method: HttpMethod): Promise<T>;
  send<T>(path: string, method: HttpMethod, body: unknown): Promise<T>;
  send<T>(
    path: string,
    method: HttpMethod,
    body: unknown,
    query: unknown
  ): Promise<T>;

  subscribe(
    type: string,
    method: string,
    params: unknown[],
    cb: ProviderInterfaceCallback
  ): Promise<number | string>;
  unsubscribe(
    type: string,
    method: string,
    id: number | string
  ): Promise<boolean>;
}
