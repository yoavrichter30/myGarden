import { Request, Response } from 'express';
import UserSchema from '../models/user';
import bcrypt from 'bcrypt';

const registry = async (request: Request, response: Response) => {
    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;

    if (!username || !email || !password){
        return response.status(400).send("Missing parameters");
    }

    const existedUser = await UserSchema.findOne({
        $or: [
            {'username': username},
            {'email': email}
        ]
    });
    if (existedUser != null) {
        return response.status(409).send("Username or email is already used");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await UserSchema.create({'username': username, 'password': encryptedPassword, 'email': email});
        return response.status(201).send(user);
    } catch (err) {
        response.status(500).send(`Error in creating new user - ${username}, \n ${err}`);
    }

}