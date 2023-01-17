const mysql = require('mysql');
const conn = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
});

conn.connect((err) => {
    if(err){
        console.log("error",err);
    }else{
        console.log("connected");
    }
});

module.exports = conn;