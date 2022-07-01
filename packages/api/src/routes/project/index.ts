import express from "express";

// import multer from "multer";
import Project from "../../controllers/project";
import admin from "../../middleware/admin";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /project:
 *    get:
 *      summary: Retrieve a list of projects
 *      tags:
 *      - Project
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/project", auth, Project.index);

/**
 * @swagger
 *  /project/:id:
 *    get:
 *      summary: Retrieve a unique project
 *      description: Show project data
 *      tags:
 *      - Project
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/project/:id", auth, Project.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - Project
 */

router.post("/api/v1/project", auth, admin, Project.create);

/**
 * @swagger
 * /project/:id:
 *   patch:
 *    summary: Update a single project
 *    tags:
 *      - Project
 *    responses:
 *      200:
 *        description:  name, description e id do project na URL
 */
router.patch("/api/v1/project/:id", auth, admin, Project.update);

/**
 * @swagger
 * /project/:id:
 *   delete:
 *     summary: Delete an project
 *     tags:
 *     - Project
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete("/api/v1/project/:id", auth, admin, Project.deleteProject);

export default router;
