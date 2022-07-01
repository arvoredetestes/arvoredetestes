import { Version } from "@monorepo/types";

import { RootState } from "../index";
import { api } from "./api";

interface VersionBaseResponse {
  status: string;
  message: string;
}
interface RetrieveVersionsResponse extends VersionBaseResponse {
  data: Version[];
}
interface RetrieveVersionResponse extends VersionBaseResponse {
  data: Version;
}

export type CreateVersionPayload = Omit<
  Version,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetVersionPayload = { id: string };
export type UpdateVersionPayload = CreateVersionPayload & GetVersionPayload;
export type DeleteVersionPayload = GetVersionPayload;

export interface Meta {
  onSuccess?: () => void;
}
export class VersionService {
  static create: (
    payload: CreateVersionPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<VersionBaseResponse>("/version", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateVersionPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<VersionBaseResponse>(
      "/version/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<Version[]> = async () => {
    const response = await api.get<RetrieveVersionsResponse>("/version");
    return response.data.data;
  };

  static get: (payload: GetVersionPayload) => Promise<Version> = async ({
    id,
  }) => {
    const response = await api.get<RetrieveVersionResponse>(
      "/version/:id".replace(":id", id)
    );
    return response.data.data;
  };

  static delete: (
    payload: DeleteVersionPayload,
    state: RootState,

    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<VersionBaseResponse>("/version/:id".replace(":id", id));
    if (onSuccess) onSuccess();
  };
}
