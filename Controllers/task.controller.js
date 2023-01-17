const {createTaskType,taskTypeList,taskById,taskupdate,taskDelete,taskRestore} = require('../Models/task.model');

module.exports = {
    insertTask:(req, resp) =>{
        const data = req.body;
        createTaskType(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'Task Type Inserted Successfully'
            });
        })
    },
    getAllTaskType:(req, resp)=>{
        taskTypeList((err, results)=>{
            if(err) throw err;
            resp.send(results);
        });
    },
    getTaskById:(req,resp)=>{
        const data = req.params.id;
        taskById(data,(err,results)=>{
            if(err) throw err;
            resp.send(results);
        });
    },
    taskupdateById:(req,resp)=>{
        const data = [
            req.body.name,
            req.params.id
        ];
        taskupdate(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'Task Type updated successfully'
            });
        });
    },
    taskDeleteById:(req,resp)=>{
        const data = [
            req.params.id
        ];
        taskDelete(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'Task Type is Deleted Successfully'
            });
        })
    },
    taskRestoreById:(req,resp)=>{
        const data = [
            req.params.id
        ];
        taskRestore(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'Task Type is Restored Successfully'
            });
        })
    }
}