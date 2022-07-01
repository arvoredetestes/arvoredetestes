import { TestCase } from "@monorepo/types";

import { RootState } from "../index";
import { api } from "./api";

interface TestCaseBaseResponse {
  status: string;
  message: string;
}
interface RetrieveTestCasesResponse extends TestCaseBaseResponse {
  data: TestCase[];
}
interface RetrieveTestCaseResponse extends TestCaseBaseResponse {
  data: TestCase;
}

export type CreateTestCasePayload = Omit<
  TestCase,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetTestCasePayload = { id: string };
export type UpdateTestCasePayload = CreateTestCasePayload & GetTestCasePayload;
export type DeleteTestCasePayload = GetTestCasePayload;

export interface Meta {
  onSuccess?: () => void;
}
export class TestCaseService {
  static create: (
    payload: CreateTestCasePayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<TestCaseBaseResponse>("/test-case", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateTestCasePayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<TestCaseBaseResponse>(
      "/test-case/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<TestCase[]> = async () => {
    const response = await api.get<RetrieveTestCasesResponse>("/test-case");
    return response.data.data;
  };

  static get: (payload: GetTestCasePayload) => Promise<TestCase> = async ({
    id,
  }) => {
    const response = await api.get<RetrieveTestCaseResponse>(
      "/test-case/:id".replace(":id", id)
    );
    return response.data.data;
  };

  static delete: (
    payload: DeleteTestCasePayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<TestCaseBaseResponse>("/test-case/:id".replace(":id", id));
    if (onSuccess) onSuccess();
  };
}
