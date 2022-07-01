import express from "express";

// import multer from "multer";
import TestScript from "../../controllers/test-script";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /test-script:
 *    get:
 *      summary: Retrieve a list of test-scripts
 *      tags:
 *      - TestScript
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/test-script", auth, TestScript.index);

/**
 * @swagger
 *  /test-script/:id:
 *    get:
 *      summary: Retrieve a unique test-script
 *      description: Show test-script data
 *      tags:
 *      - TestScript
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/test-script/:id", auth, TestScript.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - TestScript
 */

router.post("/api/v1/test-script", auth, TestScript.create);

/**
 * @swagger
 * /test-script/:id:
 *   patch:
 *    summary: Update a single test-script
 *    tags:
 *      - TestScript
 *    responses:
 *      200:
 *        description:  name, description e id do test-script na URL
 */
router.patch("/api/v1/test-script/:id", auth, TestScript.update);

/**
 * @swagger
 * /test-script/:id:
 *   delete:
 *     summary: Delete an test-script
 *     tags:
 *     - TestScript
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete("/api/v1/test-script/:id", auth, TestScript.deleteTestScript);

export default router;
