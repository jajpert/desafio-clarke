import request from "supertest";
import path from "path";

describe("Fornecedor Controller", () => {
  describe("POST /fornecedores", () => {
    it("deve criar um fornecedor com logo", async () => {
      const imagemPath = path.join(__dirname, "logo_teste.png");
      const response = await request("http://localhost:3003")
        .post("/api/v1/fornecedores")
        .field("nome", "Fornecedor C")
        .field("estado", "MG")
        .field("custo", "150")
        .field("minimo", "20")
        .field("num_clientes", "70")
        .field("nota", "4.8")
        .attach("logo", imagemPath);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("GET /fornecedores", () => {
    it("deve retornar a lista de fornecedores", async () => {
      const response = await request("http://localhost:3003/api/v1").get("/fornecedores");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /fornecedores/:id", () => {
    it("deve retornar um fornecedor pelo ID", async () => {
      const response = await request("http://localhost:3003").get("/api/v1/fornecedores/1");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id", 1);
    });

    it("deve retornar 404 se o fornecedor não for encontrado", async () => {
      const response = await request("http://localhost:3003").get("/api/v1/fornecedores/9999");
      expect(response.status).toBe(404);
    });
  });

  describe("PUT /fornecedores/:id", () => {
    it("deve atualizar um fornecedor existente", async () => {
      const response = await request("http://localhost:3003")
        .put("/api/v1/fornecedores/1")
        .send({ custo: 120, minimo: 15 });

      expect(response.status).toBe(200);
    });
  });

  describe("GET /consumo", () => {
    it("deve retornar fornecedores filtrados por consumo", async () => {
      const response = await request("http://localhost:3003").get("/api/v1/fornecedores/consumo/100");
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /fornecedores/:id", () => {
    it("deve excluir um fornecedor", async () => {
      const response = await request("http://localhost:3003").delete("/api/v1/fornecedores/1");
      expect(response.status).toBe(200);
    });
  });
});
