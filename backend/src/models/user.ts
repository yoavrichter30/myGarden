import mongoose from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    profile: string;
    refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    },
    refreshTokens: {
        type: [String],
        required: false,
    }
});

export default mongoose.model<IUser>("User", userSchema)