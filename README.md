# StudyQuest

Um aplicativo mobile gamificado projetado para transformar a rotina de estudos em uma jornada.

### Requisitos Concluídos
- [x] Implementação do sistema de login e proteção de rotas.
- [x] Desenvolvimento de um CRUD completo (Create, Read, Update, Delete) para as disciplinas.
- [x] Utilização de armazenamento seguro (`expo-secure-store`) para persistência de tokens JWT.
- [x] Testes iniciais de integração com a API e correção de UI/UX (Safe Area Insets).

---

## Tecnologias Utilizadas

A stack tecnológica foi escolhida para garantir agilidade no desenvolvimento e escalabilidade entre plataformas:

* **Frontend Mobile:** React Native com Expo (Migrado de estratégias nativas para maximizar a eficiência de entrega).
* **Roteamento:** Expo Router (File-based routing).
* **Cliente HTTP:** Axios com interceptores de requisição.
* **Backend / API:** Java e Spring Boot.
* **Persistência Local:** Expo Secure Store.

---

## Funcionalidades (MVP)

1.  **Autenticação JWT:** Login seguro com persistência de sessão.
2.  **Dashboard Gamificado:** Interface em Dark Mode.
3.  **Forja de Matérias (CRUD):** * Criação de disciplinas com definição de prioridade.
    * Listagem dinâmica e performática utilizando `FlatList`.
    * Edição de dados e exclusão com confirmação de segurança (Alertas destrutivos nativos).

---

## Como rodar o projeto localmente

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Emulador Android/iOS configurado ou o aplicativo **Expo Go** no seu smartphone físico.
* A API do backend rodando localmente (na porta `8080`).

### Passos para Instalação

1. Clone o repositório:
```bash
git clone https://github.com/nkgabriiel/study.quest.git
```

2. Acesse a pasta do projeto e instale as dependências:
```bash
cd frontend
npm install
```
3. Configure o IP da API:
No arquivo src/services/api.ts, altere a baseURL para o IP atual da sua máquina na rede local:
```bash
export const api = axios.create({
  baseURL: 'http://SEU_IP_AQUI:8080', 
});
```
4. Inicie o servidor Expo:
```
npx expo start -c
```
5. Pressione ```A``` no terminal para abrir no emulador Android ou leia o QR Code com o Expo Go no seu celular.
