
import { Users } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import Crypto from 'crypto'
import { token } from '.././token.js'
import { mail } from './mail_service.js'
import fs from 'fs'

class servicesModul {

    constructor() {
    }

    async getUserById(userName) {

        const user = await Users.findOne({ where: { userName } })
        if (!user) {
            throw { msg: 'User not founde.', code: 404 }
        }
        return user

    }


    async createUser({ name, age, userName, password, activationLink }) {

        const user = await Users.findOne({ where: { userName } })
        if (user) {
            throw { msg: `User with ${userName} already exists.`, code: 404 }
        }
        const salt = Crypto.randomBytes(64).toString('hex')
        const hashPassword = Crypto.createHmac('sha256', salt).update(password).digest('hex')
        const activationlink = Crypto.randomBytes(6).toString('hex')

        const newUser = await Users.create({ id: Crypto.randomUUID(), userName, name, age, password: hashPassword, salt, activationLink: activationlink })
        await mail.mailActivation(`${process.env.API_URL}user/activation/${activationlink}`)
        const tokens = token.genereteToken({ userId: newUser.id, userName: newUser.userName })
        return newUser
    }


    async userLogin({ userName, password }) {

        const user = await Users.findOne({ where: { userName } })
        if (!user) {
            throw { msg: 'User not founde.', code: 404 }
        }
        const hashPassword = Crypto.createHmac('sha256', user.salt).update(password).digest('hex')

        if (hashPassword !== user.password) {
            throw { msg: 'Password not valid', code: 404 }
        }
        const tokens = token.genereteToken({ userId: user.id, userName: user.userName })

        return tokens
    }


    async updateUser(id, { name, age, userName, password }) {

        const user = await Users.findByPk(id)

        if (!user) {
            throw { msg: 'User not founde.', code: 404 }
        }

        const userUpdated = await Users.update({ name, age, userName, password }, { where: { id } })
        return userUpdated
    }

    async deleteUser(id) {
        const getUser = await Users.findByPk(id)
        if (!getUser) {
            throw { msg: 'User not founde.', code: 404 }
        }
        const user = await Users.destroy({ where: { id } })
        return user
    }
    async updateImage(id, { image }, filedata) {

        const user = await Users.findByPk(id)

        if (!user) {
            throw { msg: 'User not founde.', code: 404 }
        }
        const userUpdated = await Users.update({ image: filedata.filename }, { where: { id } })
        return userUpdated
    }
    async deleteImage(id, { image }) {
        const getUser = await Users.findByPk(id)
        const name = getUser.image
        console.log(name)
        if (!getUser) {
            throw { msg: 'User not founde.', code: 404 }
        }
        fs.unlink(`public/images/${name}`, (err) => {
            if (err) console.log(err);
            else console.log("Image was deleted");
        });

        const user = await Users.update({ image: null }, { where: { id } })

        return user
    }

}
export const service = new servicesModul

