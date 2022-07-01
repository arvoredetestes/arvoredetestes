import mongoose from "mongoose";

const indexSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: String,
    projectId: String,
  },
  {
    timestamps: true,
  }
);

const Version = mongoose.model("Version", indexSchema);
export default Version;
