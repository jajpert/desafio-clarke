import React from 'react';

interface AvisoProps {
  mensagem: string;
  tipo: 'sucesso' | 'erro';
  onClose: () => void;
}

const Aviso: React.FC<AvisoProps> = ({ mensagem, tipo, onClose }) => {
  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-md text-white ${
        tipo === "sucesso" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {mensagem}
      <button className="ml-4 font-bold" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default Aviso;
