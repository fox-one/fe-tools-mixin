import { PaginationParams } from "./api";

export interface VerifyPinPayload {
  pin: string;
}

export interface GetPinLogsParams extends PaginationParams {
  category: "PIN_INCORRECT";
}
