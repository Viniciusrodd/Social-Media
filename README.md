# Rede Social com Node.js

Este projeto é uma aplicação de rede social construída com Node.js, focada em demonstrar minhas habilidades em desenvolvimento backend e frontend.

---

## 📖 Descrição

Este projeto é uma rede social onde os usuários podem se cadastrar, fazer login, criar publicações, editar seus perfis e interagir com os conteúdos. Ele destaca conceitos importantes como autenticação, manipulação de imagens, upload de arquivos e persistência de dados em um banco relacional.

---

## 🚀 Funcionalidades

- **Cadastro e Login** com autenticação baseada em sessão.
- **Publicações**: criação, edição e exclusão de postagens.
- **Perfis de Usuários**: atualização de informações pessoais e upload de imagens.
- **Página Inicial**: feed dinâmico com publicações ordenadas por data.
- **Logout Seguro**: encerramento de sessão com redirecionamento para o login.

### Funcionalidades Futuras
- Sistema de notificações.
- Likes e comentários em publicações.
- Busca e filtros por usuários e publicações.
- Adição de amizades para construção de feed.
- Troca de mensagens

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: para o backend.
- **Express**: framework web.
- **Sequelize**: ORM para manipulação do banco de dados MySQL.
- **Multer**: para upload de arquivos (imagens).
- **Bcrypt**: para hash de senhas.
- **EJS**: como motor de template para renderização no frontend.
- **MySQL**: banco de dados relacional.
- **SweetAlert2**: para alertas visuais no frontend.

---

## 📂 Estrutura do Projeto

```bash
📦 social-media
├── 📂 models            # Modelos de banco de dados
├── 📂 controllers       # Lógica de controle das rotas
├── 📂 views             # Arquivos EJS para renderização
├── 📂 public            # Arquivos estáticos (CSS, JS, imagens)
├── 📂 routes            # Definição de rotas
├── 📂 config            # Configurações (DB, middlewares, etc.)
└── app.js               # Arquivo principal da aplicação

