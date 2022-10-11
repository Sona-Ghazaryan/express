 import { body, validationResult,check } from 'express-validator'
 
 
 
 class Validator{
 
   async userNameValidation(req,res,next){
     try{
     
       const{ userName}=req.body
      const chekMail=check('userName').isEmail().normalizeEmail()
     const mail = (userName.indexOf('@'))
    
                if (mail==-1) {
                    return res.status(404).send("Email is not valid")
                }
                return  next()
     }catch(error){
       console.log(error)
     }
   }


   async  ageValidator (req,res,next){
         const {age}=req.body
    if(typeof age !=='number'){
      return  res.status(400).send("Age is invalid input Number")
    }
    if( age<16){
      return  res.status(400).send("Users which age under 16 cannt be registered.")
    }
  return  next()
}



 }


export const  midlwareValidator= new Validator