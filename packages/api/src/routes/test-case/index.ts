import express from "express";

// import multer from "multer";
import TestCase from "../../controllers/test-case";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /test-case:
 *    get:
 *      summary: Retrieve a list of test-cases
 *      tags:
 *      - TestCase
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/test-case", auth, TestCase.index);

/**
 * @swagger
 *  /test-case/:id:
 *    get:
 *      summary: Retrieve a unique test-case
 *      description: Show test-case data
 *      tags:
 *      - TestCase
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/test-case/:id", auth, TestCase.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - TestCase
 */

router.post("/api/v1/test-case", auth, TestCase.create);

/**
 * @swagger
 * /test-case/:id:
 *   patch:
 *    summary: Update a single test-case
 *    tags:
 *      - TestCase
 *    responses:
 *      200:
 *        description:  name, description e id do test-case na URL
 */
router.patch("/api/v1/test-case/:id", auth, TestCase.update);

/**
 * @swagger
 * /test-case/:id:
 *   delete:
 *     summary: Delete an test-case
 *     tags:
 *     - TestCase
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete("/api/v1/test-case/:id", auth, TestCase.deleteTestCase);

export default router;
