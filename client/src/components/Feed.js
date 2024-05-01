import axios from "axios";
import { useEffect, useState } from "react";
import Anuncio from "./Anuncio";
import CadastroAnuncio from "./CadastroAnuncio";
import "./styles.css";

function Feed() {
  const [anuncios, setAnuncios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [anunciosExibidos, setAnunciosExibidos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Função para carregar os anúncios do servidor
  const carregarAnuncios = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/anuncios");
      setAnuncios(response.data);
      setAnunciosExibidos(response.data);
    } catch (error) {
      console.error("Erro ao carregar anúncios:", error);
    }
  };

  // Carregar os anúncios ao montar o componente
  useEffect(() => {
    carregarAnuncios();
  }, []);

  // Função para filtrar os anúncios com base no filtro de busca
  const filtrarAnuncios = () => {
    const termoLowerCase = filtro.toLowerCase();
    const anunciosFiltrados = anuncios.filter((anuncio) => {
      return (
        anuncio.titulo.toLowerCase().includes(termoLowerCase) ||
        anuncio.localizacao.toLowerCase().includes(termoLowerCase) ||
        anuncio.descricao.toLowerCase().includes(termoLowerCase)
      );
    });
    setAnunciosExibidos(anunciosFiltrados);
  };

  const abrirModalCadastro = () => {
    setModalIsOpen(true);
  };

  const fecharModalCadastro = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1 className="feed-header">Anúncios</h1>
      <button onClick={abrirModalCadastro} className="feed-button">
        Cadastrar Anúncio
      </button>
      <CadastroAnuncio
        closeModal={fecharModalCadastro}
        setAnuncios={setAnuncios}
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
      {anunciosExibidos.map((anuncio, index) => (
        <Anuncio key={index} anuncio={anuncio} />
      ))}
    </div>
  );
}

export default Feed;
