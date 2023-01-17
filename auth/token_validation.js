const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken:(req, resp, next)=>{
        let token = req.get("authorization");
        if(token){
            toekn = token.slice(7);
            verify(toekn, process.env.SECRET_KEY, (err, decoded)=>{
                if(err){
                    resp.json({
                        success:0,
                        message:'Invalid Token'
                    });
                }else{
                    // console.log("decoded = ",decoded);
                    req.userId = decoded.result.id;
                    next();
                }
            });
        }else{
            resp.json({
                success:0,
                message:'Access denied, Unauthorised user'
            });
        }
    }
}