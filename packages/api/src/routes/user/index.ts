import express from "express";

import User from "../../controllers/user";
import admin from "../../middleware/admin";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/api/v1/user", auth, User.index);
router.get("/api/v1/users", auth, User.list);
router.get("/api/v1/user/:id", auth, User.show);
router.get("/api/v1/user/me/auth", auth, User.loggedUser);

router.post("/api/v1/user", auth, admin, User.create);
router.patch("/api/v1/user/:id", auth, admin, User.update);
router.delete("/api/v1/user/:id", auth, admin, User.deleteUser);

// dev only
router.delete("/deleteAllUsers", admin, User.deleteAll);

export default router;
