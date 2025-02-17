import type { Response } from "express";

type CampoEsperado = {
  campo: string;
  nomeCampo: string;
};

export const validarCamposObrigatorios = (
  dados: Record<string, string | number | undefined | null>,
  camposEsperados: CampoEsperado[],
  res: Response
): boolean => {
  const camposVazio = camposEsperados
    .filter(({ campo }) => {
      const valor = dados[campo];
      return valor === undefined || valor === null || (typeof valor === "string" && valor.trim() === "");
    })
    .map(({ nomeCampo }) => nomeCampo);

  if (camposVazio.length > 0) {
    res.status(400).json({ mensagem: `Os campos ${camposVazio.join(", ")} são obrigatórios` });
    return false;
  }
  return true;
};
