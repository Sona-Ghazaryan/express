// import { pool } from '../data-base/db.js'
// import { dataBaseORM } from '../data-base/orm.js'
//import { password } from 'pg/lib/defaults'
import { service } from '../services/service.js'
import { validationResult } from 'express-validator'
import { mail } from '../services/mail_service.js'
import { Users } from '../models/userModel.js'
import { upload } from '../midlwares/multer.js'

const uploadImage = upload.single('image')

class UserController {

    constructor() { }

    async getById(req, res) {
        try {
            const id = req.params.id

            const user = await service.getUserById(id)

            return res.send(user)

        } catch (error) {
            console.log(error)
            res.status(500).send(error.msg)
        }
    }


    async userRegistration(req, res) {
        try {

            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).send({ error, msg: 'Registration is invalid' })
            }
            const body = req.body

            const newUser = await service.createUser(body)
            res.cookie('refreshToken', newUser.refreshToken, { maxAge: 900000, httpOnly: true })

            return res.send(newUser)


        } catch (error) {

            res.status(error.code).send(error.msg)
        }
    }

    async userActivation(req, res, next) {
        try {

            const activationLink = req.params.link
            const user = await mail.mailActivated(activationLink)

            return res.redirect(process.env.USER_PAGE)
        } catch (error) {


            console.log(error)
            res.status(error.code).send(error.msg)
        }
    }



    async userLogIn(req, res) {
        try {

            const body = req.body
            const user = await service.userLogin(body)
            res.cookie('refreshToken', user.refreshToken, { maxAge: 900000, httpOnly: true })
            return res.send(user)
        } catch (error) {
            console.log(error)
            res.status(error.code).send(error.msg)
        }
    }

    async userLogOut(req, res) {
        try {
            const body = req.body
            const { refreshToken } = req.cookies
            const user = await service.getUserById(body)
            // res.clearCookie(refreshToken)
            // req.logOut();
            // req.session.destroy(function (err) {
            //        res.redirect('/')})
            req.session.destroy()
            res.clearCookie('connect.sid') // clean up!
            return res.json({ msg: 'logging you out' })

        } catch (error) {
            console.log(error)
            res.status(500).send("Logout failed")
        }



    }

    async updateInfo(req, res) {

        try {

            const body = req.body
            const id = Number(req.params.id)
            const user = await service.updateUser(id, body)

            res.status(200).send(`User modified with ID: ${id}`)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }

    async deleteUser(req, res) {

        try {
            const id = req.params.id
            const user = await service.deleteUser(id)

            res.status(200).send(`User deleted with ID: ${id}`)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }

    async imageUpload(req, res, next) {

        uploadImage(req, res, async (err) => {
            try {
                const filedata = req.file;
                console.log(filedata);
                if (!filedata)
                    res.send("Upload failed");
                else
                    res.send("Successfully uploaded")
            } catch (error) {
                console.log(error)
                res.status(422).send(error)
            }
        })

    }

    async userImage(req, res) {
        uploadImage(req, res, async (err) => {
            try {
                const id = (req.params.id)
                const body = req.body
                const filedata = req.file;
                console.log(filedata);
                if (!filedata)
                    res.send("Upload failed");
                else {
                    const user = await service.updateImage(id, body, filedata)
                    res.send("Successfully uploaded")
                }
            } catch (error) {
                console.log(error)
                res.status(422).send(error)
            }
        })


    }

    async deleteImage(req, res) {

        try {
            const body = req.body
            const id = req.params.id
            const user = await service.deleteImage(id, body)

            res.status(200).send(`Image deleted with ID: ${id}`)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
}


export const userController = new UserController('users')







