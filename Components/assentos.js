import React from 'react';

const Assentos = ({ register }) => {
  const fileiras = Array.from({ length: 10 }, (_, i) => i + 1); // Gera 1 a 10
  const colunas = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="plane">
      <div className="cockpit">
        <h1>Seleção de Assentos</h1>
      </div>
      
      <ol className="cabin fuselage">
        {fileiras.map((fileira) => (
          <li key={`row-${fileira}`} className={`row row--${fileira}`}>
            <ol className="seats">
              {colunas.map((coluna) => {
                const id = `${fileira}${coluna}`;
                return (
                  <li key={id} className="seat">
                    <input 
                      type="checkbox" 
                      id={id} 
                      value={id}
                      {...register("assentosSelecionados")} 
                    />
                    <label htmlFor={id}>{id}</label>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Assentos;