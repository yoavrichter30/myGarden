import mongoose from "mongoose";

export interface IPlant {
    id: string,
    commonName: string;
    scientificName: string;
    familyCommonName: string;
    imageUrl: string;
}

const plantSchema = new mongoose.Schema<IPlant>({
    id: {
        type: String,
        required: true,
    },
    commonName: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
        required: true,
    },
    familyCommonName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IPlant>("Plant", plantSchema)