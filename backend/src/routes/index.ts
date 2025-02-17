import { Router } from "express";
import fornecedores from "routes/fornecedores.js";
import { notFound } from "middlewares/notFound.js";

const router = Router();

router.use('/ap1/v1/fornecedores', fornecedores);
router.use(notFound);

export default router;