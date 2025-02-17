import { Router } from "express";
import fornecedores from "routes/fornecedores";
import { notFound } from "middlewares/notFound";

const router = Router();

router.use('/ap1/v1/fornecedores', fornecedores);
router.use(notFound);

export default router;