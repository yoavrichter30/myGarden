import UserSchema, { IUser } from "../models/user";
import createController from "./base.controller";

const usersController = createController<IUser>(UserSchema);

export default usersController;