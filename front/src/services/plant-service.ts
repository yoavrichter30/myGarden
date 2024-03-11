import apiClient from "./api-client"

export interface IPlant {
    id: number,
    commonName: string;
    scientificName: string;
    familyCommonName: string;
    imageUrl: string;
}

export const explore = () => {
    return new Promise<IPlant>((resolve, reject) => {
        apiClient.get("/plants/explore").then((response) => {
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    });
};