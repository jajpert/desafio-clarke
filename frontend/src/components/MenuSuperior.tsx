import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <div className="bg-gradient-to-r from-[#075632] to-[#2E2E2E] text-[#03DF7C] w-full h-20 flex items-center justify-between px-10">
      <div className="text-3xl font-bold">
        <Link to="/" className="text-[#03DF7C] no-underline">clarke desafio</Link>
        </div>
      <div className="w-full flex align-center justify-center space-x-8">
        <Link to="/" className="text-[#03DF7C] no-underline">Consumo</Link>
        <Link to="/fornecedor" className="text-[#03DF7C] no-underline">Fornecedor</Link>
      </div>
    </div>
  );
};

export default MenuSuperior;
