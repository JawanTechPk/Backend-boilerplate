const express = require("express");
const { formController, AuthController } = require("../controllers");

const router = express.Router();

router.post("/api/v1/signup", AuthController.signup);
router.post("/api/v1/login", AuthController.login);

router.post("/api/v1/requestform", formController.addForm);
router.get("/api/v1/requestform", formController.getForm);
router.put("/api/v1/requestform/:id", formController.updateForm);

module.exports = router;
