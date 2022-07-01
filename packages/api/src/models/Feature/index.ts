import mongoose from "mongoose";

const indexSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: String,
    projectId: String,
    versionsIds: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Feature = mongoose.model("Feature", indexSchema);
export default Feature;
