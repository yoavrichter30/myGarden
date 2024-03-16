import { Express } from "express";
import initApp from '../../index';
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import request from "supertest";
import userSchema from '../../models/user';

let app: Express;

const testUser = {
    email: "test@test.test",
    password: "123456",
    username: "testify",
    firstName: "testy",
    lastName: "test"
};

beforeAll(async () => {
    app = await initApp();
    //userSchema.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

let accessToken: string;
let refreshToken: string;

describe("Auth controller tests", () => {
    test("Test register", async () => {
        const response = await request(app).post("/auth/register").send(testUser);
        expect(response.statusCode).toBe(StatusCodes.CREATED);
    });
    test("Test register with existing user", async () => {
        const response = await request(app).post("/auth/register").send(testUser);
        expect(response.statusCode).toBe(StatusCodes.CONFLICT);
    });
    test("Test login", async () => {
        const response = await request(app).post("/auth/login").send({
            email: "test@test.test",
            password: "123456"
        });
        expect(response.statusCode).toBe(StatusCodes.OK);

        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
      });
});
