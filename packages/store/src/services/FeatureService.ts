import { Feature } from "@monorepo/types";

import { RootState } from "../index";
import { api, getParams } from "./api";

interface FeatureBaseResponse {
  status: string;
  message: string;
}
interface RetrieveFeaturesResponse extends FeatureBaseResponse {
  data: Feature[];
}
interface RetrieveFeatureResponse extends FeatureBaseResponse {
  data: Feature;
}

export type CreateFeaturePayload = Omit<
  Feature,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetFeaturePayload = { id: string };
export type UpdateFeaturePayload = CreateFeaturePayload & GetFeaturePayload;
export type DeleteFeaturePayload = GetFeaturePayload;

export interface Meta {
  onSuccess?: () => void;
}
export class FeatureService {
  static create: (
    payload: CreateFeaturePayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<FeatureBaseResponse>("/feature", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateFeaturePayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<FeatureBaseResponse>(
      "/feature/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<Feature[]> = async () => {
    const response = await api.get<RetrieveFeaturesResponse>("/feature", {
      params: getParams(),
    });
    return response.data.data;
  };

  static get: (payload: GetFeaturePayload) => Promise<Feature> = async ({
    id,
  }) => {
    const response = await api.get<RetrieveFeatureResponse>(
      "/feature/:id".replace(":id", id),
      {
        params: getParams(),
      }
    );
    return response.data.data;
  };

  static delete: (
    payload: DeleteFeaturePayload,
    state: RootState,

    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<FeatureBaseResponse>("/feature/:id".replace(":id", id));
    if (onSuccess) onSuccess();
  };
}
