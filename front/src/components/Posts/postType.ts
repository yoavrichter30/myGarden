import { Comment } from "../Comments/commentType"

export type Post = {
    username: string,
    plantName: string,
    imageUrl: string,
    description: string,
    comments: Comment[]
}