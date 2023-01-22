const{taskListByUserId,pendingTaskList,completedTaskListByUserId,notificationAllListByUser} = require('../Controllers/dashboard.controller');
const express = require('express');
const router = express.Router();
const { checkToken } = require("../auth/token_validation");

router.get('/totaltask',checkToken,taskListByUserId);
router.get('/pendingtask',checkToken,pendingTaskList);
router.get('/completeTask',checkToken,completedTaskListByUserId);
router.get('/notificationlist',checkToken,notificationAllListByUser);


module.exports = router;