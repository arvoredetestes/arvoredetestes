import express from "express";

// import multer from "multer";
import TestExecution from "../../controllers/test-execution";
import auth from "../../middleware/auth";

// const upload = multer({ dest: "uploads/" });

const router = express.Router();

/**
 * @swagger
 *  /test-execution:
 *    get:
 *      summary: Retrieve a list of test-executions
 *      tags:
 *      - TestExecution
 *      responses:
 *        200:
 *         description: Retorna um array
 */
router.get("/api/v1/test-execution", auth, TestExecution.index);

/**
 * @swagger
 *  /test-execution/:id:
 *    get:
 *      summary: Retrieve a unique test-execution
 *      description: Show test-execution data
 *      tags:
 *      - TestExecution
 *    responses:
 *      200:
 *        description: Retorna um objeto
 */
router.get("/api/v1/test-execution/:id", auth, TestExecution.show);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list
 *     tags:
 *      - TestExecution
 */

router.post("/api/v1/test-execution", auth, TestExecution.create);

/**
 * @swagger
 * /test-execution/:id:
 *   patch:
 *    summary: Update a single test-execution
 *    tags:
 *      - TestExecution
 *    responses:
 *      200:
 *        description:  name, description e id do test-execution na URL
 */
router.patch("/api/v1/test-execution/:id", auth, TestExecution.update);

/**
 * @swagger
 * /test-execution/:id:
 *   delete:
 *     summary: Delete an test-execution
 *     tags:
 *     - TestExecution
 *     responses:
 *       200:
 *         description: Returns code 200
 */
router.delete(
  "/api/v1/test-execution/:id",
  auth,
  TestExecution.deleteTestExecution
);

export default router;
