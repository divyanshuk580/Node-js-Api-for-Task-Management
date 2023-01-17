const {createNewTask,getAllSubtask,updateSubtaskById,subTaskDeleteById,subTaskRestoreById} = require('../Controllers/subtask.controller');
const express = require('express');
const router = express.Router();
const { checkToken } = require("../auth/token_validation");
const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    }),
  }).single("taskimage");


router.post('/',checkToken,upload,createNewTask);
router.get('/',checkToken,getAllSubtask);
router.put('/:id',checkToken,upload,updateSubtaskById);
router.post('/delete/:id',checkToken,subTaskDeleteById);
router.post('/restore/:id',checkToken,subTaskRestoreById);

module.exports = router;