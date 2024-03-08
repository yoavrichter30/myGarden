import mongoose from "mongoose";

interface IComment {
    userid: string,
    text: string
}

const commentSchema = new mongoose.Schema({
    userid: String,
    text: String
});

export interface IPost {
    userid: string,
    plantName: string,
    imageUrl: string,
    description: string,
    comments: IComment[]
}

const postSchema = new mongoose.Schema<IPost>({
    userid: {
        type: String,
        required: true,
    },
    plantName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    comments: {
        type: [commentSchema],
        required: true,
    },
});

export default mongoose.model<IPost>("Plant", postSchema)