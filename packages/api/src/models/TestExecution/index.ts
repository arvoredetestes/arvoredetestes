import mongoose from "mongoose";

const indexSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: String,
    projectId: String,
    featureId: String,
    versionsIds: [
      {
        type: String,
      },
    ],
    bdd: {
      steps: [
        {
          operator: String,
          content: String,
          resolution: {
            type: Boolean,
            default: undefined,
          },
        },
      ],
    },
    executedBy: String,
    executionDate: String,
    notes: String,
    resolution: {
      type: Boolean,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const TestExecution = mongoose.model("TestExecution", indexSchema);
export default TestExecution;
