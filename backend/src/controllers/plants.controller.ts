import { Request, Response } from "express";
import PlantSchema, { IPlant } from "../models/plant";
import baseController from "./base.controller";

const plantsController = baseController<IPlant>(PlantSchema);


const explore = async (req: Request, res: Response) => {
    console.log(`Getting random plants for exploring`);
    const randomPageNum = Math.floor((Math.random() + 1) * 5);
    console.log(`page: ${randomPageNum}`)
    const repsonse = await fetch(`https://trefle.io/api/v1/plants?token=${process.env.PLANT_API_ACCESS}&page=${randomPageNum}`);
    const plants = await repsonse.json()
    res.send(plants);
}

export default {
    explore
}