import { TestScript } from "@monorepo/types";

import { RootState } from "../index";
import { api } from "./api";

interface TestScriptBaseResponse {
  status: string;
  message: string;
}
interface RetrieveTestScriptsResponse extends TestScriptBaseResponse {
  data: TestScript[];
}
interface RetrieveTestScriptResponse extends TestScriptBaseResponse {
  data: TestScript;
}

export type CreateTestScriptPayload = Omit<
  TestScript,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetTestScriptPayload = { id: string };
export type UpdateTestScriptPayload = CreateTestScriptPayload &
  GetTestScriptPayload;
export type DeleteTestScriptPayload = GetTestScriptPayload;

export interface Meta {
  onSuccess?: () => void;
}
export class TestScriptService {
  static create: (
    payload: CreateTestScriptPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<TestScriptBaseResponse>("/test-script", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateTestScriptPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<TestScriptBaseResponse>(
      "/test-script/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<TestScript[]> = async () => {
    const response = await api.get<RetrieveTestScriptsResponse>("/test-script");
    return response.data.data;
  };

  static get: (payload: GetTestScriptPayload) => Promise<TestScript> = async ({
    id,
  }) => {
    const response = await api.get<RetrieveTestScriptResponse>(
      "/test-script/:id".replace(":id", id)
    );
    return response.data.data;
  };

  static delete: (
    payload: DeleteTestScriptPayload,
    state: RootState,

    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<TestScriptBaseResponse>(
      "/test-script/:id".replace(":id", id)
    );
    if (onSuccess) onSuccess();
  };
}
