import { Request, Response } from 'express';
import UserSchema from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const login = async (request: Request, response: Response) => {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password){
        return response.status(400).send("Missing parameters");
    }

    const user = await UserSchema.findOne({'email': email});
    if (user == null) {
        return response.status(404).send("User for that email doesn't exists");
    } 

    const isPasswdsMatches = await bcrypt.compare(password, user.password);
    if (!isPasswdsMatches){
        return response.status(401).send("Wrong email or password");
    }

    const accessToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET as string);
    if (!user.refreshTokens) {
        user.refreshTokens = [refreshToken];
    } else {
        user.refreshTokens.push(refreshToken);
    }
    
    try {
        await user.save();

        return response.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });
    } catch (err) {
        response.status(500).send(`Error login for - ${user.username}, \n ${err}`);
    }
}