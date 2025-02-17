/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as fornecedorService from "../services/fornecedor.js";
import type { Request, Response } from "express";
import type { Fornecedor } from "types/fornecedor.js";
import { excluirImagem, uploadImagem } from "../services/storage.js";
import db from "db/db.js";
import { validarCamposObrigatorios } from "utils/validaCampos.js";

export const listarFornecedores = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const fornecedores: Fornecedor[] =
      await fornecedorService.listarFornecedores();
    return res.json(fornecedores);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao listar fornecedores" });
  }
};

export const buscarFornecedorPorId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id: number = Number(req.params.id);
    const fornecedor: Fornecedor | null | undefined =
      await fornecedorService.buscarFornecedorPorId(id);

    if (!fornecedor) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }

    return res.json(fornecedor);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar fornecedor" });
  }
};

export const criarFornecedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const fornecedorData: Omit<Fornecedor, "id" | "logo"> = {
      nome: req.body.nome,
      estado: req.body.estado,
      custo: Number(req.body.custo),
      minimo: Number(req.body.minimo),
      num_clientes: Number(req.body.num_clientes),
      nota: Number(req.body.nota),
    };

    const camposObrigatorios = [
      { campo: "nome", nomeCampo: "nome" },
      { campo: "estado", nomeCampo: "estado" },
      { campo: "custo", nomeCampo: "custo" },
      { campo: "minimo", nomeCampo: "minimo" },
      { campo: "num_clientes", nomeCampo: "num_clientes" },
      { campo: "nota", nomeCampo: "nota" },
    ];

    if (!validarCamposObrigatorios(fornecedorData, camposObrigatorios, res)) {
      return res;
    }

    let logoUrl: string | null = null;

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;
      const imagem = await uploadImagem(
        `fornecedores/${originalname}`,
        buffer,
        mimetype
      );
      logoUrl = imagem.url;
    }

    const novoFornecedor = await fornecedorService.criarFornecedor({
      ...fornecedorData,
      logo: logoUrl ?? "",
    });

    return res.status(201).json(novoFornecedor);
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    return res.status(500).json({ error: "Erro ao criar fornecedor" });
  }
};

export const atualizarFornecedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);
    const fornecedorExistente =
      await fornecedorService.buscarFornecedorPorId(id);

    if (!fornecedorExistente) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }

    console.log();

    let logoUrl: string | undefined = fornecedorExistente.logo;

    if (req.file) {
      const { originalname, mimetype, buffer } = req.file;

      if (fornecedorExistente.logo) {
        await excluirImagem(fornecedorExistente.logo);
      }

      const imagem = await uploadImagem(
        `fornecedores/${originalname}`,
        buffer,
        mimetype
      );
      logoUrl = imagem.url;
    }

    const dadosAtualizados: Partial<Omit<Fornecedor, "id">> = {
      nome: req.body.nome?.trim() ?? fornecedorExistente.nome,
      estado: req.body.estado?.trim() ?? fornecedorExistente.estado,
      custo: isNaN(Number(req.body.custo))
        ? fornecedorExistente.custo
        : Number(req.body.custo),
      minimo: isNaN(Number(req.body.minimo))
        ? fornecedorExistente.minimo
        : Number(req.body.minimo),
      num_clientes: isNaN(Number(req.body.num_clientes))
        ? fornecedorExistente.num_clientes
        : Number(req.body.num_clientes),
      nota: isNaN(Number(req.body.nota))
        ? fornecedorExistente.nota
        : Number(req.body.nota),
      logo: logoUrl ?? fornecedorExistente.logo,
    };

    const fornecedorAtualizado = await fornecedorService.atualizarFornecedor(
      id,
      dadosAtualizados
    );

    return res.json(fornecedorAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    return res.status(500).json({ error: "Erro ao atualizar fornecedor" });
  }
};

export const deletarFornecedor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id);

    const fornecedor = await db("fornecedores").where({ id }).first();

    if (!fornecedor) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }

    if (fornecedor.logo) {
      await excluirImagem(fornecedor.logo as string);
    }

    await fornecedorService.deletarFornecedor(id);

    return res.json({ message: "Fornecedor deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar fornecedor:", error);
    return res.status(500).json({ error: "Erro ao deletar fornecedor" });
  }
};

export const fornecedoresPorConsumo: (
  req: Request,
  res: Response
) => Promise<Response> = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const consumo = Number(req.query.consumo);

    if (isNaN(consumo) || consumo <= 0) {
      return res
        .status(400)
        .json({ error: "O consumo informado deve ser um número maior que 0." });
    }

    const fornecedores =
      await fornecedorService.listarFornecedoresPorConsumo(consumo);
    return res.json(fornecedores);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erro ao buscar fornecedores por consumo" });
  }
};
