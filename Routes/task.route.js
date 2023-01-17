const {insertTask,getAllTaskType,getTaskById,taskupdateById,taskDeleteById,taskRestoreById} = require('../Controllers/task.controller');
const express = require('express');
const router = express.Router();
const { checkToken } = require("../auth/token_validation");

router.post('/',checkToken,insertTask);
router.get('/',checkToken,getAllTaskType);
router.get('/:id',checkToken,getTaskById);
router.put('/:id',checkToken,taskupdateById);
router.get('/delete/:id',checkToken,taskDeleteById);
router.get('/restore/:id',checkToken,taskRestoreById);

module.exports = router;