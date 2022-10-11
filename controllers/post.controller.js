import { postService } from "../services/post_Service.js";

class PostController {

    constructor() { }
    async getById(req, res) {
        try {
            const id = req.params.id
            const post = await postService.getPostbyId(id)

            return res.send(post)


        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    async getUserposts(req, res) {

        try {
            const id = req.params.id
            
            const user = await postService.getUserPosts(id)
            return res.send(user)
           
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
    async newPost(req, res) {
        try {
            const body = req.body
            const post = await postService.postCreate(body)
            return res.send(post)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }
    async postUpdate(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const post = await postService.postUpdate(id, body)

            res.status(200).send(`Post modified with ID: ${id}`)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }
    async postDelete(req, res) {
        try {
            const id = req.params.id

            const post = await postService.postDelete(id)

            res.status(200).send(`Post deleted with ID: ${id}`)

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }

    }

}






export const postController = new PostController