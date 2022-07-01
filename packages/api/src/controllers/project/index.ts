import Project from "../../models/Project";
import { Controllers } from "../../util/types";

const projectController: Controllers = {
  async index(req, res) {
    try {
      const items = await Project.find();

      res.status(200).json({
        status: "success",
        data: items,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async show(req, res) {
    const { id } = req.params;
    try {
      const item = await Project.findById(id);
      res.status(200).json({ status: "success", data: item });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async create(req, res) {
    try {
      const item: any = new Project(req.body);
      await item.save();
      res.status(200).json({ status: "success", message: "Project created" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const item = await Project.findByIdAndUpdate(
        id,
        { $set: { ...req.body, _id: undefined } },
        { upsert: true, new: true }
      );

      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      await Project.findByIdAndDelete(id);

      res.status(200).json({ status: "success", message: "Project deleted" });
    } catch (error) {
      res.status(400).json({
        status: "error",
        // @ts-ignore
        message: error.message,
      });
    }
  },
};

export default projectController;
