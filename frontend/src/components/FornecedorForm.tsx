import { useRef, useState } from "react";
import axios from "hooks/axios";
import Aviso from "components/Aviso";

const FornecedorForm = () => {
  const nomeRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const estadoRef = useRef<HTMLInputElement>(null);
  const custoRef = useRef<HTMLInputElement>(null);
  const minimoRef = useRef<HTMLInputElement>(null);
  const numClientesRef = useRef<HTMLInputElement>(null);
  const notaRef = useRef<HTMLInputElement>(null);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">("sucesso");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nomeRef.current ||
      !estadoRef.current ||
      !custoRef.current ||
      !minimoRef.current ||
      !numClientesRef.current ||
      !notaRef.current
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("nome", nomeRef.current.value);
    if (logoRef.current?.files?.[0]) {
      formData.append("logo", logoRef.current.files[0]);
    }
    formData.append("estado", estadoRef.current.value);
    formData.append("custo", custoRef.current.value);
    formData.append("minimo", minimoRef.current.value);
    formData.append("num_clientes", numClientesRef.current.value);
    formData.append("nota", notaRef.current.value);

    try {
      const response = await axios.post("http://localhost:3003/api/v1/fornecedores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Fornecedor cadastrado com sucesso:", response.data);
      setMensagem("Fornecedor cadastrado com sucesso!");
      setTipoMensagem("sucesso");

      nomeRef.current.value = "";
      if (logoRef.current) logoRef.current.value = "";
      estadoRef.current.value = "";
      custoRef.current.value = "";
      minimoRef.current.value = "";
      numClientesRef.current.value = "";
      notaRef.current.value = "";
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error);
      setMensagem("Erro ao cadastrar fornecedor. Tente novamente.");
      setTipoMensagem("erro");
    }
  };

  return (
    <div>
      {mensagem && <Aviso mensagem={mensagem} tipo={tipoMensagem} onClose={() => setMensagem("")} />}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Cadastro de Fornecedor</h2>

        <label className="block mb-2">Nome:</label>
        <input type="text" ref={nomeRef} className="w-full p-2 border rounded mb-4" required />

        <label className="block text-gray-700 font-medium mb-2">Logo:</label>
        <div className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
          <input
            type="file"
            ref={logoRef}
            accept="image/*"
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-green-600 file:cursor-pointer hover:file:bg-green-700"
          />
        </div>

        <label className="block mb-2">Estado:</label>
        <input type="text" ref={estadoRef} className="w-full p-2 border rounded mb-4" maxLength={2} required />

        <label className="block mb-2">Custo por kWh:</label>
        <input type="number" ref={custoRef} className="w-full p-2 border rounded mb-4" step="0.01" required />

        <label className="block mb-2">Limite mínimo de kWh:</label>
        <input type="number" ref={minimoRef} className="w-full p-2 border rounded mb-4" step="0.01" required />

        <label className="block mb-2">Total de Clientes:</label>
        <input type="number" ref={numClientesRef} className="w-full p-2 border rounded mb-4" required />

        <label className="block mb-2">Avaliação (Nota):</label>
        <input type="number" ref={notaRef} className="w-full p-2 border rounded mb-4" step="0.1" min="0" max="10" required />

        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default FornecedorForm;
