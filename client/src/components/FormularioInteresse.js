import { useState } from "react";
import "./styles.css";

function FormularioInteresse({ onClose, onSubmeter }) {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState(null);
  const [imagemMiniatura, setImagemMiniatura] = useState(null);

  const handleImagemChange = (e) => {
    const selectedImage = e.target.files[0];
    setImagem(selectedImage);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagemMiniatura(e.target.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const interesse = {
      nome,
      contato,
      localizacao,
      mensagem,
      imagem: imagemMiniatura,
    };
    onSubmeter(interesse);
    onClose();
    setNome("");
    setContato("");
    setLocalizacao("");
    setMensagem("");
    setImagem(null);
    setImagemMiniatura(null);
  };

  return (
    <div className="modal-container">
      <div className="modal-content formulario-interesse">
        <h2 className="modal-title">Formulário de Interesse</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="modal-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="modal-label">Contato:</label>
          <input
            type="text"
            className="modal-input"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />

          <label className="modal-label">Localização:</label>
          <input
            type="text"
            className="modal-input"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
          />

          <label className="modal-label">Mensagem:</label>
          <textarea
            className="modal-input"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          ></textarea>

          <label className="modal-label">Foto do item:</label>
          <input
            type="file"
            accept="image/*"
            className="modal-input"
            onChange={handleImagemChange}
          />

          {imagemMiniatura && (
            <img
              src={imagemMiniatura}
              alt="Miniatura da Imagem"
              className="modal-img"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}

          <button type="submit" className="modal-button">
            Submeter
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioInteresse;
