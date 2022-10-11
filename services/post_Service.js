
import { Posts } from "../models/postModel.js";
import { Users } from "../models/userModel.js"
import { Op } from "sequelize";
class postModel {
    constructor() { }


    async getPostbyId(id) {


        const post = await Posts.findByPk(id)
        console.log(post)
        if (!post) {
            throw { msg: 'Post not founde.', code: 404 }
        }

        return post
    }

    async getUserPosts(id) {

        const user = await Users.findByPk(id)
        if (!user) {
            throw { msg: 'User not founde.', code: 404 }
        }
        const post= Users.findOne({where:{id},include:Posts})
        // const post= Users.findAll({include:[{model:Posts, right: true, where:{Created_by:{[Op.eq]:7}}}],})
       



        return post
    }

    async postCreate({ title, text, time, Created_by }) {
        const newpost = await Posts.create({ title, text, time, Created_by })

        return newpost
    }

    async postUpdate(id, { title, text, time, Created_by }) {
        const getPost = await Posts.findByPk(id)
        if (!getPost) {
            throw { msg: 'Post not founde.', code: 404 }
        }
        const post = await Posts.update({ title, text, time, Created_by }, { where: { id } })
    }

    async postDelete(id) {
        const getPost = await Posts.findByPk(id)
        if (!getPost) {
            throw { msg: 'Post not founde.', code: 404 }
        }
        const post = await Posts.destroy({ where: { id } })
    }

}






export const postService = new postModel