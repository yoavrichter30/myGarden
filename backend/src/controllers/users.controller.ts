import UserSchema, { IUser } from "../models/user";
import baseController from "./base.controller";

const usersController = baseController<IUser>(UserSchema);

export default usersController;