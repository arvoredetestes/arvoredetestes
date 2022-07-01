import { Project } from "@monorepo/types";

import { RootState } from "../index";
import { api } from "./api";

interface ProjectBaseResponse {
  status: string;
  message: string;
}
interface RetrieveProjectsResponse extends ProjectBaseResponse {
  data: Project[];
}
interface RetrieveProjectResponse extends ProjectBaseResponse {
  data: Project;
}

export type CreateProjectPayload = Omit<
  Project,
  "createdAt" | "updatedAt" | "_id" | "createdBy"
>;
export type GetProjectPayload = { id: string };
export type UpdateProjectPayload = CreateProjectPayload & GetProjectPayload;
export type DeleteProjectPayload = GetProjectPayload;

export interface Meta {
  onSuccess?: () => void;
}
export class ProjectService {
  static create: (
    payload: CreateProjectPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    await api.post<ProjectBaseResponse>("/project", payload);
    if (onSuccess) onSuccess();
  };

  static update: (
    payload: UpdateProjectPayload,
    state: RootState,
    meta: Meta
  ) => Promise<void> = async ({ id, ...rest }, state, { onSuccess }) => {
    await api.patch<ProjectBaseResponse>(
      "/project/:id".replace(":id", id),
      rest
    );
    if (onSuccess) onSuccess();
  };

  static retrieve: () => Promise<Project[]> = async () => {
    const response = await api.get<RetrieveProjectsResponse>("/project");
    return response.data.data;
  };

  static get: (payload: GetProjectPayload) => Promise<Project> = async ({
    id,
  }) => {
    const response = await api.get<RetrieveProjectResponse>(
      "/project/:id".replace(":id", id)
    );
    return response.data.data;
  };

  static delete: (
    payload: DeleteProjectPayload,
    state: RootState,

    meta: Meta
  ) => Promise<void> = async ({ id }, state, { onSuccess }) => {
    await api.delete<ProjectBaseResponse>("/project/:id".replace(":id", id));
    if (onSuccess) onSuccess();
  };
}
