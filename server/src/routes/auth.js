const { Router } = require("express");
const { registerValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/auth-middleware");
const { getUsers, register } = require("../controllers/auth");
const router = Router();

router.get("/get-users", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);

module.exports = router;
