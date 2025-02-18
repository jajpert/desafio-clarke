import { useState } from "react";
import Card from "components/Card";
import InputBusca from "components/InputBusca";

const Home = () => {
  const [fornecedores, setFornecedores] = useState([]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <InputBusca setFornecedores={setFornecedores} />

      {fornecedores.length === 0 ? (
        <p className="text-gray-600 mt-4">Não há fornecedores disponíveis para seu consumo mensal.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {fornecedores.map((fornecedor, index) => (
            <Card key={index} fornecedor={fornecedor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
