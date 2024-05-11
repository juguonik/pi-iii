import { useState } from "react";
import Chat from "./Chat";
import "./styles.css";

function Anuncio({ anuncio }) {
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mensagens, setMensagens] = useState([]);

  const handleClose = () => {
    setMostrarChat(false);
  };

  const handleSubmit = (mensagem) => {
    setMensagens([...mensagens, mensagem]);
    console.log("Submetido:", mensagem);
  };

  const handleChatClick = () => {
    setMostrarChat(true);
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
      {mostrarChat ? (
        <Chat
          onClose={handleClose}
          onSubmeter={handleSubmit}
          mensagens={mensagens}
        />
      ) : (
        <button onClick={handleChatClick} className="anuncio-button">
          Abrir Chat
        </button>
      )}
    </div>
  );
}

export default Anuncio;
