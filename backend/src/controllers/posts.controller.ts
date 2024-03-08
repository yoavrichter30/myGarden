import postSchema, { IPost } from "../models/post";
import baseController from "./base.controller";

const postsController = baseController<IPost>(postSchema);

export default postsController;