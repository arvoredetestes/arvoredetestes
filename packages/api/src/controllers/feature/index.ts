import Feature from "../../models/Feature";
import { Controllers } from "../../util/types";

const projectController: Controllers = {
  async index(req, res) {
    try {
      const query = {
        projectId: req.query.project,
        versionsIds: req.query.version,
      };
      const items = await Feature.find(query);

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
      const item = await Feature.findById(id);
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
      const item: any = new Feature(req.body);
      await item.save();
      res.status(200).json({ status: "success", message: "Feature created" });
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
      const item = await Feature.findByIdAndUpdate(
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
  async deleteFeature(req, res) {
    try {
      const { id } = req.params;
      await Feature.findByIdAndDelete(id);

      res.status(200).json({ status: "success", message: "Feature deleted" });
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
