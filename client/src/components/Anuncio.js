import { useState } from "react";
import FormularioInteresse from "./FormularioInteresse";
import "./styles.css";

function Anuncio({ anuncio }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleInteresseClick = () => {
    setMostrarFormulario(true);
  };

  const handleFormSubmit = (interesse) => {
    console.log("Interesse enviado:", interesse);
    setMostrarFormulario(false);
  };

  return (
    <div className="anuncio-container">
      <h2 className="anuncio-title">{anuncio.titulo}</h2>
      {anuncio.imagemMiniatura && (
        <img
          src={anuncio.imagemMiniatura}
          alt="Miniatura da Imagem"
          className="anuncio-img"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
      <p className="anuncio-description">Descrição: {anuncio.descricao}</p>
      <p className="anuncio-location">Localização: {anuncio.localizacao}</p>
      {mostrarFormulario ? (
        <FormularioInteresse
          onSubmeter={handleFormSubmit}
          onClose={() => setMostrarFormulario(false)}
        />
      ) : (
        <button onClick={handleInteresseClick} className="anuncio-button">
          Tenho Interesse
        </button>
      )}
    </div>
  );
}

export default Anuncio;
