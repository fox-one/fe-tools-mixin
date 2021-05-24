/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  ProviderInterface,
  ProviderInterfaceEmitted,
  ProviderInterfaceEmitCb,
  ProviderInterfaceCallback,
  HttpMethod,
  MixinNetworkResponse
} from "../types";
import axios, { AxiosInstance, AxiosResponse } from "axios";

import DEFAULTS from "../defaults";

export default class HttpProvider implements ProviderInterface {
  private axios: AxiosInstance;

  constructor(
    endpoint: string = DEFAULTS.HTTP_URL,
    headers: Record<string, string> = {}
  ) {
    this.axios = axios.create({
      baseURL: endpoint,
      headers
    });

    this.axios.interceptors.response.use(
      (response: AxiosResponse<MixinNetworkResponse>) => {
        if (response.data.error) {
          const { code, description } = response.data.error;

          return Promise.reject(new Error(`${code}: ${description}`));
        }

        return Promise.resolve(response);
      }
    );
  }

  public get hasSubscriptions(): boolean {
    return false;
  }

  public get isConnected(): boolean {
    return true;
  }

  public get instance(): AxiosInstance {
    return this.axios;
  }

  public async connect(): Promise<void> {
    // noop
  }

  public async disconnect(): Promise<void> {
    // noop
  }

  public clone(): ProviderInterface {
    throw new Error("Unimplemented");
  }

  public on(
    type: ProviderInterfaceEmitted,
    sub: ProviderInterfaceEmitCb
  ): () => void {
    console.error(
      "HTTP Provider does not have 'on' emitters, use WebSockets instead"
    );

    return () => {
      //
    };
  }

  public async send(
    path: string,
    method: HttpMethod,
    body?: Record<string, unknown>,
    query?: Record<string, string>
  ): Promise<unknown> {
    const response = await this.axios.request<
      unknown,
      AxiosResponse<MixinNetworkResponse>
    >({
      data: body,
      method,
      params: query,
      url: path
    });

    return response.data.data;
  }

  public subscribe(
    types: string,
    method: string,
    params: unknown[],
    cb: ProviderInterfaceCallback
  ): Promise<number> {
    throw new Error(
      "HTTP Provider does not have subscriptions, use WebSockets instead"
    );
  }

  public unsubscribe(
    type: string,
    method: string,
    id: number
  ): Promise<boolean> {
    throw new Error(
      "HTTP Provider does not have subscriptions, use WebSockets instead"
    );
  }
}
