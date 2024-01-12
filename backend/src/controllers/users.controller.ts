import { User } from "../models";
import createController from "./base.controller";

const usersController = createController<User>(User);

export default usersController;