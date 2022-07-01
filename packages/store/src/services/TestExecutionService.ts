import { TestExecution } from "@monorepo/types";

import { RootState } from "../index";
import { api } from "./api";

interface TestExecutionBaseResponse {
  status: string;
  message: string;
}
interface RetrieveTestExecutionsResponse extends TestExecutionBaseResponse {
  data: TestExecution[];
}
interface RetrieveTestExecutionResponse extends TestExecutionBaseResponse {
  data: TestExecution;
}

export type CreateTestExecutionPayload = Omit<
  TestExecution,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetTestExecutionPayload = { id: string };
export type UpdateTestExecutionPayload = CreateTestExecutionPayload &
  GetTestExecutionPayload;
export type DeleteTestExecutionPayload = GetTestExecutionPayload;

export interface Meta {
  onSuccess?: () => void;
}
export class TestExecutionService {
  static create: (
    payload: CreateTestExecutionPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<TestExecutionBaseResponse>("/test-execution", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateTestExecutionPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<TestExecutionBaseResponse>(
      "/test-execution/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<TestExecution[]> = async () => {
    const response = await api.get<RetrieveTestExecutionsResponse>(
      "/test-execution"
    );
    return response.data.data;
  };

  static get: (payload: GetTestExecutionPayload) => Promise<TestExecution> =
    async ({ id }) => {
      const response = await api.get<RetrieveTestExecutionResponse>(
        "/test-execution/:id".replace(":id", id)
      );
      return response.data.data;
    };

  static delete: (
    payload: DeleteTestExecutionPayload,
    state: RootState,

    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<TestExecutionBaseResponse>(
      "/test-execution/:id".replace(":id", id)
    );
    if (onSuccess) onSuccess();
  };
}
