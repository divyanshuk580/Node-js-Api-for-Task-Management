const {
  createsubTask,
  showAllSubTask,
  updateSubTask,
  deleteById,
  restoreById,
} = require("../Models/subtask.model");
const { createNotification } = require("../Models/notifications.model");
module.exports = {
  createNewTask: (req, resp) => {
    const data = [
      req.body.task_type,
      req.userId,
      req.body.name,
      req.body.description,
      req.file.filename,
      req.body.task_progress,
      req.body.assign_to,
    ];
    createsubTask(data, (err, results) => {
      if (err) throw err;

      if (results.insertId > 0) {
        const notificationData = {
          moduleName: "Task",
          moduleId: results.insertId,
          title: req.body.name,
          send_to: req.body.assign_to,
          created_by: req.userId,
        };
        createNotification(notificationData, (err, notiresults) => {
          if (err) throw err;
        });
      }
      
      return resp.json({
        success: 1,
        message: "New Task Created Successfully",
      });
    });
  },
  getAllSubtask: (req, resp) => {
    showAllSubTask((err, results) => {
      if (err) throw err;
      return resp.json({
        userId:req.session.userId,
        result:results
      });
    });
  },
  updateSubtaskById: (req, resp) => {
    const data = [
      req.body.task_type,
      req.body.name,
      req.body.description,
      req.file.filename,
      req.body.task_progress,
      req.body.assign_to,
      req.params.id,
    ];

    updateSubTask(data, (err, results) => {
      if (err) throw err;

      if (results.affectedRows > 0) {
        const notificationData = {
          moduleName: "Task",
          moduleId: req.params.id,
          title: req.body.name,
          send_to: req.body.assign_to,
          created_by: req.userId,
        };
        createNotification(notificationData, (err, notiresults) => {
          if (err) throw err;
        });
      }
      // resp.send(results);
      return resp.json({
        success: 1,
        message: "Task is updated successfully",
      });
    });
  },
  subTaskDeleteById: (req, resp) => {
    const data = [req.params.id];
    deleteById(data, (err, results) => {
      if (err) throw err;
      return resp.json({
        success: 1,
        message: "Subtask is deleted successfully",
      });
    });
  },
  subTaskRestoreById: (req, resp) => {
    const data = [req.params.id];
    restoreById(data, (err, results) => {
      if (err) throw err;
      return resp.json({
        success: 1,
        message: "Subtask is restored successfully",
      });
    });
  },
};
