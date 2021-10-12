const express = require("express");
const router = express.Router()
const ctrlr = require("../controllers")

/* SECTION: Routes: BaseURL = /job */
router.post("/create", ctrlr.job.createJob);
router.get("/find/:id", ctrlr.job.getJob);
router.put("/update/:id", ctrlr.job.updateJob);
router.delete("/delete/:id", ctrlr.job.deleteJob);
router.get("/city/:cityName", ctrlr.job.retrieveCityJobs);

/* SECTION: Exports */
module.exports = router;