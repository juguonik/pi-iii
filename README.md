## :page_with_curl: Como rodar o projeto
 - Após clonar o projeto, acesse cada pasta (client e server) e rode o comando npm install;
 - Dentro da pasta client rode o comando npm run dev;
 - Dentro da pasta server rode o comando node server.js;

## Atenção!
Não há scripts para criação automática do schema no BD.
Dessa maneira, é necessário criar em seu gerenciador de BD o schema <b>trocajogos</b>, com as seguintes tabelas (sem acentuação):
 - usuarios;
 - anuncios;
 - mensagens.

## Arquivo .env 
Deve ser criado um arquivo .env dentro da pasta server com as seguintes informações:
```
DB_USER=[inserir o user do db]
DB_PASSWORD=[inserir senha]
DB_NAME=trocajogos
DB_HOST=[inserir o host que está configurado no bd]
DB_PORT=[inserir a porta que está configurada no bd]
```
