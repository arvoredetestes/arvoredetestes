import express from "express";

// import multer from "multer";
import Version from "../../controllers/version";
import admin from "../../middleware/admin";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /version:
 *    get:
 *      summary: Retrieve a list of versions
 *      tags:
 *      - Version
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/version", auth, Version.index);

/**
 * @swagger
 *  /version/:id:
 *    get:
 *      summary: Retrieve a unique version
 *      description: Show version data
 *      tags:
 *      - Version
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/version/:id", auth, Version.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - Version
 */

router.post("/api/v1/version", auth, admin, Version.create);

/**
 * @swagger
 * /version/:id:
 *   patch:
 *    summary: Update a single version
 *    tags:
 *      - Version
 *    responses:
 *      200:
 *        description:  name, description e id do version na URL
 */
router.patch("/api/v1/version/:id", auth, admin, Version.update);

/**
 * @swagger
 * /version/:id:
 *   delete:
 *     summary: Delete an version
 *     tags:
 *     - Version
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete("/api/v1/version/:id", auth, admin, Version.deleteVersion);

export default router;
