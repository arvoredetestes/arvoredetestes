import express from "express";

// import multer from "multer";
import Feature from "../../controllers/feature";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /feature:
 *    get:
 *      summary: Retrieve a list of features
 *      tags:
 *      - Feature
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/feature", auth, Feature.index);

/**
 * @swagger
 *  /feature/:id:
 *    get:
 *      summary: Retrieve a unique feature
 *      description: Show feature data
 *      tags:
 *      - Feature
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/feature/:id", auth, Feature.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - Feature
 */

router.post("/api/v1/feature", auth, Feature.create);

/**
 * @swagger
 * /feature/:id:
 *   patch:
 *    summary: Update a single feature
 *    tags:
 *      - Feature
 *    responses:
 *      200:
 *        description:  name, description e id do feature na URL
 */
router.patch("/api/v1/feature/:id", auth, Feature.update);

/**
 * @swagger
 * /feature/:id:
 *   delete:
 *     summary: Delete an feature
 *     tags:
 *     - Feature
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete("/api/v1/feature/:id", auth, Feature.deleteFeature);

export default router;
