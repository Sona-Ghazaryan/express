
import { Router } from "express";
import { userController} from "./controllers/user.controller.js"
import{ midlwareValidator } from'./validation/validation.js'
import { postController } from "./controllers/post.controller.js";
import { authMidlware } from "./midlwares/auth-midlware.js";


export const router = Router()


router.get('/user/:id',authMidlware,userController.getById)
router.post('/user',midlwareValidator.userNameValidation, userController.userRegistration)
router.get('/user/activation/:link',userController.userActivation )
router.post('/user/login',userController.userLogIn)
router.get('/user/logout',userController.userLogOut)
router.delete('/user/delete/:id',userController.deleteUser)
router.put('/user/update/:id',userController.updateInfo)
router.post('/user/updatimage/:id',userController.userImage)
router.post('/upload',userController.imageUpload)
router.delete('/user/image/delete/:id',userController.deleteImage)


router.get('/post/:id',postController.getById)
router.get('/post/user/:id',postController.getUserposts)
router.post('/post',postController.newPost)
router.put('/post/update/:id',postController.postUpdate)
router.delete('/post/delete/:id',postController.postDelete)

 
