import postSchema, { IPost } from "../models/post";
import {BaseController} from "./base.controller";
import { Request, Response } from "express";

export class PostsController extends BaseController<IPost> {
    constructor() {
        super(postSchema);
    }

    async postsByUser(req: Request, res: Response) {
        const username = req.params.username; 
        try {
            console.log(req.params)
            const posts = await this.model.find({ username }); 
            res.send(posts);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async updatePostById(req: Request, res: Response){
        const id = req.params.id;
        const updatedProps = req.body as IPost;
        
        console.log("updatePostById")
        if(!updatedProps.plantName && !updatedProps.imageUrl && !updatedProps.description){
            throw new Error("Missing params");
        }

        const updatedPost = await postSchema.findByIdAndUpdate(id, updatedProps, { new: true })

        if (!updatedPost) {
            throw new Error("Couldn't find requested user");
        }

        res.status(200).send();
    }
}

// class PostsController extends BaseController<IPost>{

//     async post(req: Request, res: Response) {
//         console.log("postStudent:" + req.body);
//         const _id = req.user._id;
//         req.body.owner = _id;
//         super.post(req, res);
//     }
// }

