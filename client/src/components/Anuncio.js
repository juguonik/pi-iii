import { useState } from "react";
import Chat from "./Chat";
import "./styles.css";

function Anuncio({ anuncio, onNovaMensagemChat }) {
  const [mostrarChat, setMostrarChat] = useState(false);

  const handleChatClick = () => {
    setMostrarChat(true);
  };

  const handleChatSubmit = (mensagem) => {
    console.log("Mensagem enviada:", mensagem);
  };

  const handleNovaMensagemChat = (mensagem) => {
    onNovaMensagemChat(mensagem);
  };

  return (
    <div className="anuncio-container">
      <h2 className="anuncio-title">{anuncio.titulo}</h2>
      {anuncio.imagemMiniatura && (
        <img
          src={"http://localhost:3001" + anuncio.imagemMiniatura}
          alt="Miniatura da Imagem"
          className="anuncio-img"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
      <p className="anuncio-description">Descrição: {anuncio.descricao}</p>
      <p className="anuncio-location">Localização: {anuncio.localizacao}</p>
      {mostrarChat ? (
        <Chat
          onSubmeter={handleChatSubmit}
          onClose={() => setMostrarChat(false)}
          onNovaMensagem={handleNovaMensagemChat}
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
