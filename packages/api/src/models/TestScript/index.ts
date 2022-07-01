import mongoose from "mongoose";

const indexSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: String,
    featureId: String,
    projectId: String,
    versionsIds: [
      {
        type: String,
      },
    ],
    testCasesIds: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TestScript = mongoose.model("TestScript", indexSchema);
export default TestScript;
