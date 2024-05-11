import { useEffect, useRef, useState } from "react";
import "./styles.css";

function Chat({ isOpen, onClose, onSubmeter, onNovaMensagem }) {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const chatRef = useRef(null);

  const handleEnviarMensagem = () => {
    if (mensagem.trim() !== "") {
      const novaMensagem = {
        remetente: "Teste",
        texto: mensagem,
      };

      setMensagens([...mensagens, novaMensagem]);
      onSubmeter(novaMensagem);
      onNovaMensagem(novaMensagem);

      setMensagem("");
    }
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content chat" ref={chatRef}>
        <h2 className="modal-title">Chat</h2>
        <div className="mensagens-container">
          {mensagens.map((msg, index) => (
            <div key={index} className="mensagem">
              <span className="remetente">{msg.remetente}:</span>{" "}
              <span className="texto">{msg.texto}</span>
            </div>
          ))}
        </div>
        <div className="campo-mensagem">
          <input
            type="text"
            className="modal-input"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button className="modal-button" onClick={handleEnviarMensagem}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
