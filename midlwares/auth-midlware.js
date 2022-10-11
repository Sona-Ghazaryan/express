import jwt from 'jsonwebtoken'
import { Users } from '../models/userModel.js'


export const authMidlware = async (req, res, next) => {
    try{
    const token = req.headers.token
   
    if(!token){
     return   res.status(400).send("unautorized")
    }

        const decode = jwt.decode(token)
        console.log(decode)
          
          const user = await Users.findByPk(decode.userId)
        req.user=user
        next()
    }catch(err){
        res.status(400).send("invalidToken")
    }

  

}
 
