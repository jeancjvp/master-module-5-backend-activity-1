const app = require("../src/app");
const request = require("supertest");
const employeeExample = require("./employeeExample.json");

/**
 * POST /api/employees
 */
describe("POST /api/employees", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/employees").send(employeeExample);
        expect(response.statusCode).toBe(201);
    });

    test("should respond with a 400 status code", async () => {
        const response = await request(app).post("/api/employees").send({ name: "test" });
        expect(response.statusCode).toBe(400);
    });
});

/**
 * GET /api/employees
 */
describe("GET /api/employees", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Array", async () => {
        const response = await request(app).get("/api/employees").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

/**
 * GET /api/employees?page=1
 */
describe("GET /api/employees?page=1", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees?page=1").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Array", async () => {
        const response = await request(app).get("/api/employees?page=1").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

/**
 * GET /api/employees/oldest
 */
describe("GET /api/employees/oldest", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees/oldest").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Object", async () => {
        const response = await request(app).get("/api/employees/oldest").send();
        expect(response.body).toBeInstanceOf(Object);
    });
});

/**
 * GET /api/employees?user=true
 */
describe("GET /api/employees?user=true", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees?user=true").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Array", async () => {
        const response = await request(app).get("/api/employees?user=true").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

/**
 * GET /api/employees?badges=black
 */
describe("GET /api/employees?badges=black", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees?badges=black").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Array", async () => {
        const response = await request(app).get("/api/employees?badges=black").send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

/**
 * GET /api/employees/sue
 */
describe("GET /api/employees/sue", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/employees/sue").send();
        expect(response.statusCode).toBe(200);
    });

    test("should respond with an Array", async () => {
        const response = await request(app).get("/api/employees/sue").send();
        expect(response.body).toBeInstanceOf(Array);
    });

    test("should respond with a 404 status code", async () => {
        const response = await request(app).get("/api/employees/asdasd").send();
        expect(response.statusCode).toBe(404);
    });
});