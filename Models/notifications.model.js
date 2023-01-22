const conn = require('../Config/database');

module.exports={
    createNotification:(data,callBack)=>{
        
        conn.query(`insert into notifications (module,module_id,title,send_to,created_by) values (?,?,?,?,?)`,[data.moduleName,data.moduleId,data.title,data.send_to,data.created_by],(error,results,fields)=>{
            if(error) {
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    },
    notificationListByUserId:(data,callBack)=>{
        conn.query(`select * from notifications where send_to = ?`,data,(error,results,fields)=>{
            if(error){
                callBack(error);
            }else{
                callBack(null,results);
            }
        })
    }
}