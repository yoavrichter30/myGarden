import apiClient from "./api-client"

import { PostData } from "../components/Post"

// export { CanceledError }
// const getAllPosts = () => {
//     const abortController = new AbortController()
//     const req = apiClient.get<PostData[]>('studentpost', { signal: abortController.signal })
//     return { req, abort: () => abortController.abort() }

// }

interface IComment {
    username: string,
    text: string
}

export interface IPost {
    username?: string,
    plantName?: string,
    imageUrl?: string,
    description?: string,
    comments?: IComment[]
}

export const createPost = (post: IPost) => {
    return new Promise<IPost>((resolve, reject) => {
        console.log("Registering user...")
        console.log(post)
        apiClient.post("/posts/create", post).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export default { createPost }