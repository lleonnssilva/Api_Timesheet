"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointment-controller");
const authService = require("../services/auth-service");

router.get("/", controller.get);
router.post("/", authService.isAdmin, controller.post);
router.put("/:id", authService.isAdmin, controller.put);
router.delete("/", authService.isAdmin, controller.delete);
module.exports = router;
