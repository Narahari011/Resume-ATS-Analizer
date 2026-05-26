const express = require("express");
const router = express.Router();
const ResumeController = require("../Controllers/resume");

const multer = require("multer");

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
});

// Upload + Analyze
router.post(
  "/addResume",
  upload.single("resume"),
  ResumeController.addResume
);

// History
router.get("/:user", ResumeController.getAllResumeForUser);

// Admin
router.get(
  "/admin/all",
  ResumeController.getAllResumeForAdmin
);

module.exports = router;