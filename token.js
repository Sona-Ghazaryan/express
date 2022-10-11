import jwt from 'jsonwebtoken'
import { Users } from './models/userModel.js'


class tokenService {
    async genereteToken(payload) {
       
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
            { expiresIn: "2h", });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,
            { expiresIn: "48h", });
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Users.findOne({ where: { user: userId } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Users.create({ user: userId, refreshToken })
        return token
    }
}

export const token = new tokenService()