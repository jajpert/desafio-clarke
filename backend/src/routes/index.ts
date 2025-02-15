import { Router } from "express";

const router = Router();

router.get("/frase", (req, res) => {
  res.json({
    mensagem: "A vida é muito curta para ser pequena"
  });
});

export default router;