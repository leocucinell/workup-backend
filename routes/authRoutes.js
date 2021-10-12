const express = require("express");
const router = express.Router()
const ctrlr = require("../controllers")

/* SECTION: Routes: BaseURL = /auth */
router.post("/new", ctrlr.auth.createUser);
router.get("/login", ctrlr.auth.authenticateUser);
router.get("/getUser/:id", ctrlr.auth.getUser);
router.put("/updateUser/:id", ctrlr.auth.updateUser);
router.delete("/delete/:id", ctrlr.auth.deleteUser);
router.put("/addJob/:id", ctrlr.auth.addjobPosting);

/* SECTION: Exports */
module.exports = router;