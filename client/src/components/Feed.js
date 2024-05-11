import axios from "axios";
import { useEffect, useState } from "react";
import Anuncio from "./Anuncio";
import CadastroAnuncio from "./CadastroAnuncio";
import Mensagens from "./Mensagens";
import "./styles.css";

function Feed() {
  const [anuncios, setAnuncios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [anunciosExibidos, setAnunciosExibidos] = useState(anuncios);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [mensagensChat, setMensagensChat] = useState([]); // Novo estado para armazenar mensagens do chat
  const [showMessagesModal, setShowMessagesModal] = useState(false);

  const adicionarAnuncio = (anuncios) => {
    setAnuncios(anuncios);
    setAnunciosExibidos(anuncios);
  };

  const filtrarAnuncios = () => {
    const termoLowerCase = filtro.toLowerCase();
    const anunciosFiltrados = anuncios.filter((anuncio) => {
      return (
        anuncio?.titulo?.toLowerCase().includes(termoLowerCase) ||
        anuncio?.localizacao?.toLowerCase().includes(termoLowerCase) ||
        anuncio?.descricao?.toLowerCase().includes(termoLowerCase)
      );
    });
    setAnunciosExibidos(anunciosFiltrados);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCloseMensagens = () => {
    setMensagens([]);
    setShowMessagesModal(false);
  };

  const handleResponder = (mensagem) => {
    setMensagens([...mensagens, mensagem]);
  };

  const handleNovaMensagemChat = (mensagem) => {
    setMensagensChat([...mensagensChat, mensagem]);
    handleNovaMensagem(mensagem);
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:3001/api/anuncios").then((response) => {
        setAnuncios(response.data);
        setAnunciosExibidos(response.data);
      });
    } catch (error) {
      console.error("Erro ao carregar anúncios:", error);
    }
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setShowMessagesModal(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div>
      <h1 className="feed-header">Anúncios</h1>
      <button onClick={openModal} className="feed-button">
        Cadastrar Anúncio
      </button>
      <button
        onClick={() => setShowMessagesModal(true)}
        className="feed-button"
      >
        Minhas Mensagens
      </button>
      {modalIsOpen && (
        <CadastroAnuncio
          setAnuncios={adicionarAnuncio}
          closeModal={closeModal}
        />
      )}

      <Mensagens
        mensagens={mensagens} // Estado global de mensagens
        mensagensChat={mensagensChat} // Mensagens do chat
        onClose={handleCloseMensagens}
        onResponder={handleResponder}
        isOpen={showMessagesModal}
        onCloseModal={() => setShowMessagesModal(false)}
        onNovaMensagem={handleNovaMensagemChat} // Passa a função de adicionar mensagem do chat
      />

      <div className="feed-search">
        <input
          type="text"
          placeholder="Buscar em todos os campos"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="feed-input"
        />
        <button onClick={filtrarAnuncios} className="feed-filter-button">
          Filtrar
        </button>
      </div>
      {(anunciosExibidos || anuncios).map((anuncio, index) => (
        <Anuncio key={index} anuncio={anuncio} />
      ))}
    </div>
  );
}

export default Feed;
