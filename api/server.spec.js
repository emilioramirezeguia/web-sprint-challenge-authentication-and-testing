const supertest = require("supertest");

const server = require("./server");
const db = require("../database/dbConfig");

describe("auth-router", () => {
  describe("POST /register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("returns 201 Created", async () => {
      const response = await supertest(server).post("/api/auth/register").send({
        username: "emilio",
        password: "emilio",
      });

      expect(response.status).toBe(201);
    });

    it("adds a new user", async () => {
      await supertest(server).post("/api/auth/register").send({
        username: "ramirez",
        password: "ramirez",
      });

      const users = await db("users");

      expect(users).toHaveLength(1);
      expect(users[0]).toHaveProperty("username", "ramirez");
    });
  });

  describe("POST /login", () => {
    it("returns 200 OK", async () => {
      const response = await supertest(server).post("/api/auth/login").send({
        username: "ramirez",
        password: "ramirez",
      });

      expect(response.status).toBe(200);
    });

    it("sends back a token", async () => {
      const response = await supertest(server).post("/api/auth/login").send({
        username: "ramirez",
        password: "ramirez",
      });

      expect(response.body.token).toBeTruthy();
    });
  });
});
