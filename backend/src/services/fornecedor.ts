import db from "db/db.js";
import type { Fornecedor } from "types/fornecedor.js";

export async function listarFornecedores(): Promise<Fornecedor[]> {
  return await db<Fornecedor>("fornecedores").select("*");
}

export async function buscarFornecedorPorId(id: number): Promise<Fornecedor | undefined> {
  const fornecedor = await db<Fornecedor>("fornecedores").where({ id }).first();
  return fornecedor;
}


export async function criarFornecedor(dados: Omit<Fornecedor, "id">): Promise<Fornecedor> {
  const [novoFornecedor] = await db<Fornecedor>("fornecedores").insert(dados).returning("*");
  return novoFornecedor;
}

export async function atualizarFornecedor(
  id: number,
  dados: Partial<Omit<Fornecedor, "id">>
): Promise<Fornecedor | undefined> {
  const [fornecedorAtualizado] = await db<Fornecedor>("fornecedores").where({ id }).update(dados).returning("*");
  return fornecedorAtualizado;
}

export async function deletarFornecedor(id: number): Promise<void> {
  await db("fornecedores").where({ id }).del();
}

export async function listarFornecedoresPorConsumo(consumo: number): Promise<Fornecedor[]> {
  return await db<Fornecedor>("fornecedores").where("minimo", "<=", consumo).select("*");
}