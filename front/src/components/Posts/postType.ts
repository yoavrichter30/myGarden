import { Comment } from "../Comments/commentType"

export type Post = {
    userid: string,
    plantName: string,
    imageUrl: string,
    description: string,
    comments: Comment[]
}