import { nanoid } from "nanoid";

export enum UserRole {
  admin = "admin",
  user = "user",
}

export interface BaseDoc {
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface User extends BaseDoc {
  name: string;
  role: UserRole;
  email: string;
  token: string;
}

export interface Project extends BaseDoc {
  name: string;
  createdBy: string;
  description: string;
}

export interface Version extends BaseDoc {
  name: string;
  description: string;
  createdBy: string;
  projectId: string;
}

export interface Feature extends BaseDoc {
  name: string;
  description: string;
  projectId: string;
  createdBy: string;
  versionsIds: string[];
}

export enum BDDOperator {
  BACKGROUND = "BACKGROUND",
  SCENARIO = "SCENARIO",
  GIVEN = "GIVEN",
  WHEN = "WHEN",
  THEN = "THEN",
  AND = "AND",
  BUT = "BUT",
}
export class BddStep {
  operator: BDDOperator = BDDOperator.GIVEN;
  content = "";
  resolution: boolean | null = null;
  uiId: string;
  constructor() {
    this.uiId = nanoid();
  }
}
export class Bdd {
  steps: BddStep[] = [new BddStep()];
}
export interface TestCase extends BaseDoc {
  name: string;
  createdBy: string;
  description: string;
  projectId: string;
  featureId: string;
  versionsIds: string[];
  bdd: Bdd;
}

export interface TestExecution extends TestCase {
  executedBy: string;
  executionDate: string;
  notes: string;
  resolution: boolean | null;
}

export interface TestScript extends BaseDoc {
  name: string;
  createdBy: string;
  description: string;
  projectId: string;
  featureId: string;
  testCasesIds: string[];
  versionsIds: string[];
}
