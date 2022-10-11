import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { Users } from '../models/userModel.js'


class mailActivation {
  constructor() { }

  async mailActivation(link) {
    try {

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: 'ghasona@yandex.ru',
        subject: "Hello ✔",
        text: "Hello world?",
        html: ` <div> <a href="${link}"> Activation link </a> </div>`,

      });

    } catch (error) {
      console.log(error)
    }
  }
  async mailActivated(activationLink) {
    const user = await Users.findOne({ where: { activationLink } })
    if (!user) {
      throw { msg: 'User not activated.', code: 404 }
    }
    user.isActivated = true;

    await user.save()
    
  }
}


export const mail = new mailActivation