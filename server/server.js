// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(bodyParser.json());
// app.use(cors());

// let anuncios = [];
// let mensagens = [];
// let usuarios = [];

// function generateId() {
//   return "_" + Math.random().toString(36).substr(2, 9);
// }

// app.post("/api/registro", (req, res) => {
//   const { nome, email, nomeUsuario, senha } = req.body;

//   const usuarioExistente = usuarios.find((u) => u.nomeUsuario === nomeUsuario);
//   if (usuarioExistente) {
//     return res.status(400).json({ mensagem: "Nome de usuário já em uso." });
//   }

//   const novoUsuario = { id: generateId(), nome, email, nomeUsuario, senha };
//   usuarios.push(novoUsuario);

//   return res.status(201).json({ mensagem: "Usuário registrado com sucesso." });
// });

// app.post("/api/login", (req, res) => {
//   const { nomeUsuario, senha } = req.body;

//   const usuario = usuarios.find(
//     (u) => u.nomeUsuario === nomeUsuario && u.senha === senha
//   );
//   if (!usuario) {
//     return res
//       .status(401)
//       .json({ mensagem: "Nome de usuário ou senha incorretos." });
//   }

//   const token = generateId();
//   return res.status(200).json({ mensagem: "Login bem-sucedido", token });
// });

// app.get("/api/anuncios", (req, res) => {
//   return res.status(200).json(anuncios);
// });

// app.post("/api/anuncios", (req, res) => {
//   const { titulo, descricao, localizacao, imagemMiniatura } = req.body;

//   const novoAnuncio = {
//     id: generateId(),
//     titulo,
//     descricao,
//     localizacao,
//     imagemMiniatura,
//   };
//   anuncios.push(novoAnuncio);

//   return res.status(201).json({ mensagem: "Anúncio criado com sucesso." });
// });

// app.post("/api/mensagens", (req, res) => {
//   const { anuncioId, remetente, texto } = req.body;

//   const novaMensagem = { id: generateId(), anuncioId, remetente, texto };
//   mensagens.push(novaMensagem);

//   return res
//     .status(201)
//     .json({ mensagem: "Mensagem de interesse criada com sucesso." });
// });

// app.get("/api/mensagens/:anuncioId", (req, res) => {
//   const anuncioId = req.params.anuncioId;
//   const mensagensDoAnuncio = mensagens.filter((m) => m.anuncioId === anuncioId);

//   return res.status(200).json(mensagensDoAnuncio);
// });

// app.listen(port, () => {
//   console.log(`Servidor iniciado na porta ${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "./.env") });
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

let anuncios = [];
let mensagens = [];
let usuarios = [];

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

app.post("/api/registro", (req, res) => {
  const { nome, email, nomeUsuario, senha } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE nomeUsuario = ?",
    [nomeUsuario],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }

      if (results.length > 0) {
        return res.status(400).json({ mensagem: "Nome de usuário já em uso." });
      }

      db.query(
        "INSERT INTO usuarios (nome, email, nomeUsuario, senha) VALUES (?, ?, ?, ?)",
        [nome, email, nomeUsuario, senha],
        (err, result) => {
          if (err) {
            console.error("Erro ao inserir usuário no banco de dados:", err);
            return res
              .status(500)
              .json({ mensagem: "Erro interno do servidor." });
          }
          return res
            .status(201)
            .json({ mensagem: "Usuário registrado com sucesso." });
        }
      );
    }
  );
});

app.post("/api/login", (req, res) => {
  const { nomeUsuario, senha } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE nomeUsuario = ? AND senha = ?",
    [nomeUsuario, senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar usuário no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ mensagem: "Nome de usuário ou senha incorretos." });
      }
      const token = generateId();
      return res.status(200).json({ mensagem: "Login bem-sucedido", token });
    }
  );
});

app.get("/api/anuncios", (req, res) => {
  db.query("SELECT * FROM anuncios", (err, results) => {
    if (err) {
      console.error("Erro ao buscar anúncios no banco de dados:", err);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
    return res.status(200).json(results);
  });
});

app.post("/api/anuncios", (req, res) => {
  console.log("req", req);
  console.log("body", req.body);
  const { titulo, descricao, localizacao, imagem } = req.body;

  const novoAnuncio = {
    id: generateId(),
    titulo,
    descricao,
    localizacao,
    imagemMiniatura: imagem,
  };
  anuncios.push(novoAnuncio);

  db.query(
    "INSERT INTO anuncios (titulo, descricao, localizacao, imagemMiniatura) VALUES (?, ?, ?, ?)",
    [titulo, descricao, localizacao, imagem],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir anúncio no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res.status(201).json({ mensagem: "Anúncio criado com sucesso." });
    }
  );
});

app.post("/api/mensagens", (req, res) => {
  const { anuncioId, remetente, texto } = req.body;

  const novaMensagem = {
    id: generateId(),
    anuncioId,
    remetente,
    texto,
  };

  db.query(
    "INSERT INTO mensagens (anuncioId, remetente, texto) VALUES (?, ?, ?)",
    [anuncioId, remetente, texto],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir mensagem no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res
        .status(201)
        .json({ mensagem: "Mensagem de interesse criada com sucesso." });
    }
  );
});

app.get("/api/mensagens/:anuncioId", (req, res) => {
  const anuncioId = req.params.anuncioId;

  db.query(
    "SELECT * FROM mensagens WHERE anuncioId = ?",
    [anuncioId],
    (err, results) => {
      if (err) {
        console.error("Erro ao buscar mensagens no banco de dados:", err);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
      }
      return res.status(200).json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
