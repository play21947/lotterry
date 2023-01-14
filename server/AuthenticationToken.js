const bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

const AuthenticationToken=async(req, res, next)=>{
    let token = req.headers.authorization.split(' ')[1]

    // console.log("Auth Token : ", token)

    if(token){
        try{
            req.decoded = await jwt.verify(token, 'secret_play2')
            
        }catch(err){
            if(err){
                console.log(err)
                req.decoded = {bad_token: true}
            }
        }
    }else{
        req.decoded = {bad_token: true}
    }

    next()

}

module.exports = AuthenticationToken