const {getTotalTaskByUserId,pendingTaskByUserId,completedTaskByUserId} = require('../Models/subtask.model');
const {notificationListByUserId} = require('../Models/notifications.model');

module.exports = {
    taskListByUserId:(req,resp)=>{
        const data = [
            req.userId
        ];
        getTotalTaskByUserId(data,(err,results)=>{
            if(err) throw err;
            
            return resp.json({
                totalTask:results[0].taskCount
            });
        });
    },
    pendingTaskList:(req,resp)=>{
        const data = [
            req.userId
        ];

        pendingTaskByUserId(data,(err,results)=>{
            if(err) throw err;

            return resp.json({
                pendingTask:results[0].taskCount
            });
        });
        
    },
    completedTaskListByUserId:(req,resp)=>{
        const data = [
            req.userId
        ];
        completedTaskByUserId(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                completeTask:results[0].taskCount
            });
        });
    },
    notificationAllListByUser:(req,resp)=>{
        const data = [
            req.userId
        ];
        notificationListByUserId(data,(err,results)=>{
            if(err) throw err;
            resp.send(results);
        })
    }
}