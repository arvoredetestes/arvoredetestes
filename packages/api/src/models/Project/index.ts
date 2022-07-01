import mongoose from "mongoose";

const indexSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    createdBy: String,
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", indexSchema);
export default Project;
