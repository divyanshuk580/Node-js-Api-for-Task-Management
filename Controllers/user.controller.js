const { create, showUser, showUserByEmail, updateUser, getUserById,deleteUser,restoreUser } = require('../Models/user.model');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const session = require('express-session');

module.exports = {
    createUser : (req, resp) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=>{
            if(err){
                console.log(err);
                return resp.status(500).json({
                    success:0,
                    message:"Database Connection error"
                });
            }
            return resp.status(200).json({
                success: 1,
                data:results
            });
        });
    },
    showUserList: (req, resp) =>{
        showUser((err, result) => {
            if(err) throw err;
            return resp.send(result);
        })
    },
    findUserByEmail:(req, resp)=>{
        const data = req.body.email;
        showUserByEmail(data,(err, results)=>{
            if(err) throw err;
            return resp.send(results);
        });
    },
    updateUserById:(req, resp)=>{
        const data = [
            req.body.name,
            req.body.is_admin,
            req.body.gender,
            req.body.contact_no,
            req.params.id
        ];

        updateUser(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'User Updated Successfully'
            });
        })
    },
    userDetailById:(req, resp)=>{
        const data = req.params.id;
        getUserById(data,(err,results)=>{
            if(err) throw err;
            resp.send(results);
        });
    },
    deleteUserById:(req,resp)=>{
        const data = [
            req.params.id
        ];
        deleteUser(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'User Deleted successfully'
            });
        })
    },
    restoreUserById:(req,resp)=>{
        const data = [
            req.params.id
        ];
        restoreUser(data,(err,results)=>{
            if(err) throw err;
            return resp.json({
                success:1,
                message:'User Restore successfully'
            });
        })
    },
    login:(req,resp)=>{
        const data = req.body;

        showUserByEmail(data.email, (err, results)=>{
            if(!results){
                return resp.json({
                    success:0,
                    message:"Invalid email and password"
                });
            }

            const result = compareSync(data.password, results.password,(err, results));

            if(results){
                results.password = undefined;
                const jsontoken = sign({result:results},process.env.SECRET_KEY,{
                    expiresIn:"1h"
                });
               
                req.session.userId = results.id;
                req.body={
                    userId:results.id
                }

                return resp.json({
                    success:1,
                    message:'Login Successfully',
                    token:jsontoken,
                    userId:results.id
                });
            }else{
                return resp.json({
                    success:0,
                    message: "Invalid email or password"
                });
            }
        })
    },
    logout:(req,resp)=>{
        if (req.session.userId) {
            delete req.session.userId;
            delete req.userId;
            resp.json({
                success:1,
                message: 'Log Out Successfully'
            });
        } else {
            resp.json({result: 'ERROR', message: 'User is not logged in.'});
        }
    }
}