const conn = require('../config/database');

module.exports = {
    createTaskType:(data,callBack)=>{
        console.log("Data",data);
        conn.query(`insert into task_type (type) values (?)`, data.type, (error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    taskTypeList:(callBack)=>{
        conn.query(`select * from task_type`, (error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    taskById:(data,callBack)=>{
        conn.query(`select * from task_type where id = ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        });
    },
    taskupdate:(data,callBack)=>{
        conn.query(`update task_type set type = ? where id =  ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    },
    taskDelete:(data,callBack)=>{
        conn.query(`update task_type set status = 0, is_deleted = 1 where id =  ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    },
    taskRestore:(data,callBack)=>{
        conn.query(`update task_type set status = 1, is_deleted = 0 where id =  ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    }
}