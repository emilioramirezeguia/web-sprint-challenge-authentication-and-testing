const supertest = require("supertest");

const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("./auth-model");

describe("server", () => {
  describe("POST /register", () => {
    it("should return 201 Created", async () => {
      const response = await supertest(server).post("/api/auth/register").send({
        username: "emilio5",
        password: "emilio5",
      });

      expect(response.status).toBe(201);
    });
  });
});
