# 📱 Frontend — CRUD de Livros

Aplicativo mobile para gerenciamento de livros, desenvolvido com React Native e Expo.

---

## Tecnologias

- React Native
- Expo SDK 54
- Expo Router
- TypeScript

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na máquina
- [Expo Go](https://expo.dev/go) instalado no celular (SDK 54)
- Backend rodando (local ou no Render)

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/Priscila319/frontend-livro.git
cd frontend-livro

# Instale as dependências
npm install
```

---

## Configuração

Abra o arquivo `services/api.ts` e altere a variável `BASE_URL` com o endereço do backend:

```ts
// Para testar no emulador Android
const BASE_URL = "http://10.0.2.2:3000";

// Para testar no celular físico (use o IP da sua máquina na rede local)
const BASE_URL = "http://192.168.x.x:3000";

// Para produção (backend no Render)
const BASE_URL = "https://seu-app.onrender.com";
```

---

## Execução

```bash
npx expo start
```

Escaneie o QR code exibido no terminal com o aplicativo **Expo Go** no celular.

---

## Funcionalidades

- Listar todos os livros cadastrados
- Cadastrar novo livro
- Editar livro existente
- Deletar livro
- Pull to refresh na lista
