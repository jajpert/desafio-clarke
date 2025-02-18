import { useState } from "react";
import axios from "hooks/axios";

interface InputBuscaProps {
  setFornecedores: (fornecedores: any) => void;
}

const InputBusca = ({ setFornecedores }: InputBuscaProps) => {
  const [consumo, setConsumo] = useState("");
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;

    if (!/^\d*\.?\d*$/.test(valor)) {
      setErro("Digite apenas números.");
    } else {
      setErro("");
    }

    setConsumo(valor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const consumoNum = Number(consumo);

    if (isNaN(consumoNum) || consumoNum <= 0) {
      setErro("O consumo deve ser um número maior que 0.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3003/api/v1/fornecedores/consumo/${consumoNum}`);

      setFornecedores(response.data);
      setErro("");
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
      setErro("Erro ao buscar fornecedores. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-4">
      <label className="m-2">Informe o seu consumo mensal de energia:</label>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={consumo}
          onChange={handleChange}
          className={`flex-1 border px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 ${
            erro ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-400"
          }`}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition cursor-pointer"
        >
          Buscar
        </button>
      </div>
      {erro && <p className="text-red-500 text-sm mt-1">{erro}</p>}
    </form>
  );
};

export default InputBusca;