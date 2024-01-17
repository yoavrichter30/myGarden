import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async getAll(req: Request, res: Response) {
        console.log(`Getting all - ${this.model.modelName}`);
        try {
            if (req.query.name) {
                const students = await this.model.find({ name: req.query.name });
                res.send(students);
            } else {
                const students = await this.model.find();
                res.send(students);
            }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        console.log(`Getting - ${this.model.modelName} by ID - ${req.params.id}`);
        try {
            const student = await this.model.findById(req.params.id);
            res.send(student);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    async create(req: Request, res: Response) {
        console.log(`Creating new - ${this.model.modelName}`);
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err: any) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    UpdateById(req: Request, res: Response) {
        console.log(`Updating - ${this.model.modelName} with ID - ${req.params.id}`);
        res.send("put student by id: " + req.params.id);
    }

    deleteById(req: Request, res: Response) {
        console.log(`Deleting - ${this.model.modelName} with ID - ${req.params.id}`);
        res.send("delete student by id: " + req.params.id);
    }
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseController<ModelType>(model);
}

export default createController;