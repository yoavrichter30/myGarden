import apiClient from "./api-client"

export interface IUser {
    _id?: string,
    email?: string,
    password?: string,
    username?: string,
    firstName?: string,
    lastName?: string,
    accessToken?: string,
    refreshToken?: string
}

export const register = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log(`Registering user - ${user.email}`);
        apiClient.post("/auth/register", user).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    });
}

export const login = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log(`Loging user - ${user.email}`);
        apiClient.post("/auth/login", user).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    });
}