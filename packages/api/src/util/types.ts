import { RequestHandler } from "express";
import mongoose from "mongoose";

export type Middleware = RequestHandler;

export type Controllers = Record<string, Middleware>;

export interface BaseEntity extends mongoose.Document {
  createdAt: string;
  updatedAt: string;
  _id: string;
}
