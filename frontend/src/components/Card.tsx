import Fornecedor from "types/fornecedor.type";

const Card = ({ fornecedor }: { fornecedor: Fornecedor }) => {
  return (
    <div className="w-64 bg-gray-300 p-4 rounded-lg shadow-md flex flex-col items-center">
      <img
        src={fornecedor.logo}
        alt={`Logo de ${fornecedor.nome}`}
        className="w-16 h-16 rounded-md mb-4 object-contain bg-white"
      />

      <div className="text-left w-full">
        <p className="font-semibold">Nome: {fornecedor.nome}</p>
        <p className="font-semibold">Estado: {fornecedor.estado}</p>
        <p className="font-semibold">Custo por kWh: R${fornecedor.custo}</p>
        <p className="font-semibold">Limite mínimo de kWh: {fornecedor.minimo}</p>
        <p className="font-semibold">Total de clientes: {fornecedor.num_clientes}</p>
        <p className="font-semibold">Avaliação: {fornecedor.nota}</p>
      </div>
    </div>
  );
};

export default Card;
