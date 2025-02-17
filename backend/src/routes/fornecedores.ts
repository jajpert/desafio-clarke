import asyncHandler from "../utils/asyncHandler.js"
import { Router } from "express";
import upload from "../middlewares/multer.js";
import {
  listarFornecedores,
  buscarFornecedorPorId,
  criarFornecedor,
  atualizarFornecedor,
  deletarFornecedor,
  fornecedoresPorConsumo
} from "../controllers/fornecedores.js";

const router = Router();

router.get("/", asyncHandler(listarFornecedores));
router.get("/:id", asyncHandler(buscarFornecedorPorId));
router.post("/", upload.single("logo"), asyncHandler(criarFornecedor));
router.put("/:id", asyncHandler(atualizarFornecedor));
router.delete("/:id", asyncHandler(deletarFornecedor));
router.get("/consumo/:consumo", asyncHandler(fornecedoresPorConsumo));

export default router;
