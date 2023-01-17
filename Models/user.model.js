const conn = require("../config/database");

module.exports = {
  create: (data, callBack) => {
    conn.query(
      `insert into users (name, email, password, is_admin, gender, contact_no) values(?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.password,
        data.is_admin,
        data.gender,
        data.contact_no
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(null, results);
        }
      }
    );
  },
  showUser:(callBack)=>{
    conn.query(`select * from users where status = 1 AND is_deleted = 0`,(error, results, fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null, results);
        }
    });
  },
  showUserByEmail:(data, callBack)=>{
    conn.query(`select * from users where email = ? AND status = 1 AND is_deleted = 0`,data, (error, results, fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null,results[0])
        }
    });
  },
  updateUser:(data, callBack)=>{
    conn.query(`update users set name = ?, is_admin = ?, gender = ?, contact_no = ? where id = ?`,data, (error, results, fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null, results);
        }
    });
  },
  getUserById:(data, callBack)=>{
    conn.query(`select * from users where id = ?`,data,(error,results,fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null,results);
        }
    });
  },
  deleteUser:(data,callBack)=>{
    conn.query(`update users set status = 0, is_deleted = 1 where id = ?`,data,(error,results,fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null,results);
        }
    });
  },
  restoreUser:(data,callBack)=>{
    conn.query(`update users set status = 1, is_deleted = 0 where id = `,data,(error,results,fields)=>{
        if(error){
            return callBack(error);
        }else{
            return callBack(null,results);
        }
    });
  }
}