const conn = require('../Config/database');

module.exports = {
    createsubTask:(data, callBack)=>{
        conn.query(`insert into subtask (task_type,created_by,name,description,taskimage,task_progress,assign_to) values (?,?,?,?,?,?,?)`, data, (error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    showAllSubTask:(callBack)=>{
        conn.query(`select * from subtask`,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    updateSubTask:(data,callBack)=>{
        conn.query(`update subtask set task_type = ?, name=?,description=?,taskimage=?,task_progress=?,assign_to = ? where id = ?`,data, (error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    deleteById:(data,callBack)=>{
        conn.query(`update subtask set status = 0, is_deleted = 1 where id = ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    },
    restoreById:(data,callBack)=>{
        conn.query(`update subtask set status = 1, is_deleted = 0 where id = ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    }
}