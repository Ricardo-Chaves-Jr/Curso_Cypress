# Curso Cypress — Testes de API

Projeto de testes automatizados de API utilizando [Cypress](https://www.cypress.io/) e o plugin [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api). Os testes cobrem o fluxo CRUD de usuários e o login contra a API pública [ServeRest](https://serverest.dev/).

## Pré-condições

- **Node.js** 18 ou superior (inclui o `npm`) — [download](https://nodejs.org/)
- **Git** para clonar o repositório
- Acesso à internet (os testes consomem a API pública `https://serverest.dev`)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Ricardo-Chaves-Jr/Curso_Cypress.git
cd Curso_Cypress
npm install
```

## Variáveis de ambiente

A URL base da API não fica mais hardcoded no código — ela é lida da variável de ambiente `apiUrl` do Cypress. O valor padrão está definido em [cypress.config.js](cypress.config.js):

```js
env: {
  apiUrl: "https://serverest.dev",
}
```

Para apontar os testes para outro ambiente, use qualquer uma das opções abaixo (ordem de precedência do Cypress, da menor para a maior):

1. **`cypress.config.js`** — valor padrão versionado no repositório.
2. **`cypress.env.json`** — override local, **fora do Git** (é o equivalente ao `.env` no Cypress). Copie o exemplo e ajuste:

   ```bash
   cp cypress.env.example.json cypress.env.json
   ```

   ```json
   {
     "apiUrl": "https://sua-api-de-homolog.dev"
   }
   ```

3. **Variável de ambiente do SO** — prefixo `CYPRESS_`:

   ```bash
   # Linux / macOS
   CYPRESS_apiUrl=https://sua-api.dev npm run cypress:run

   # Windows (PowerShell)
   $env:CYPRESS_apiUrl="https://sua-api.dev"; npm run cypress:run
   ```

4. **Flag `--env`** na linha de comando (maior precedência):

   ```bash
   npx cypress run --env apiUrl=https://sua-api.dev
   ```

> As variáveis `id` e `token` também usam `Cypress.env(...)`, mas são preenchidas em tempo de execução para compartilhar dados entre os testes — não precisam ser configuradas manualmente.

## Como executar

### Modo interativo (Test Runner)

Abre a interface gráfica do Cypress, onde você escolhe o navegador e acompanha a execução dos testes:

```bash
npm run cypress:open
```

### Modo headless (linha de comando)

Executa todos os testes no terminal, sem interface gráfica:

```bash
npm run cypress:run
```

> O comando `npm test` é um atalho equivalente ao `npm run cypress:run`.

Para rodar um arquivo de teste específico:

```bash
npx cypress run --spec "cypress/e2e/usuarios/criar.cy.js"
```

## Relatório e evidências

A cada execução em modo headless (`npm run cypress:run`) são gerados:

- **Relatório HTML** em `cypress/reports/` — via [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter). Lista todos os testes executados (status, duração, gráficos) e **embute os screenshots das falhas** no próprio arquivo. Abra o `index.html` no navegador.
- **Screenshots** em `cypress/screenshots/` — capturados automaticamente **apenas quando um teste falha** (`screenshotOnRunFailure`).
- **Vídeos** em `cypress/videos/` — gravação completa de cada spec (`video: true`).

Essas pastas ficam fora do Git (veja o [.gitignore](.gitignore)).

### No CI (GitHub Actions)

O workflow [.github/workflows/ci.yml](.github/workflows/ci.yml) roda os testes a cada `push` na `main` e publica, como *artifacts* do job, o relatório HTML (sempre), os vídeos (sempre) e os screenshots (somente quando há falha). Para acessar: abra a execução em **Actions → job → seção _Artifacts_**, baixe `relatorio-testes` e abra o `index.html`.

## Estrutura do projeto

```
Curso_Cypress/
├── cypress/
│   ├── e2e/
│   │   └── usuarios/                # Um spec por operação (verbo)
│   │       ├── criar.cy.js          # POST   /usuarios
│   │       ├── listar.cy.js         # GET    /usuarios
│   │       ├── buscar.cy.js         # GET    /usuarios/{id}
│   │       ├── atualizar.cy.js      # PUT    /usuarios/{id}
│   │       ├── login.cy.js          # POST   /login
│   │       └── deletar.cy.js        # DELETE /usuarios/{id}
│   ├── fixtures/
│   │   └── User.json                # Dados de usuário usados nos testes
│   └── support/
│       ├── commands.js              # Comandos customizados (CRUD, login, setup_user)
│       └── e2e.js                   # Configurações globais de suporte
├── cypress.config.js                # Configuração do Cypress (baseUrl, env.apiUrl)
├── cypress.env.example.json         # Modelo para override local (copie para cypress.env.json)
└── package.json
```

## Cenários de teste

Cada operação da API fica em um arquivo próprio dentro de [cypress/e2e/usuarios/](cypress/e2e/usuarios/):

| Spec | Verbo | Endpoint | O que valida |
| --- | --- | --- | --- |
| [criar.cy.js](cypress/e2e/usuarios/criar.cy.js) | `POST` | `/usuarios` | Cadastro de novo usuário (201) |
| [listar.cy.js](cypress/e2e/usuarios/listar.cy.js) | `GET` | `/usuarios` | Listagem de todos os usuários (200) |
| [buscar.cy.js](cypress/e2e/usuarios/buscar.cy.js) | `GET` | `/usuarios/{id}` | Busca do usuário por ID (200) |
| [atualizar.cy.js](cypress/e2e/usuarios/atualizar.cy.js) | `PUT` | `/usuarios/{id}` | Alteração dos dados (200) |
| [login.cy.js](cypress/e2e/usuarios/login.cy.js) | `POST` | `/login` | Login e obtenção do token (200) |
| [deletar.cy.js](cypress/e2e/usuarios/deletar.cy.js) | `DELETE` | `/usuarios/{id}` | Exclusão do usuário (200) |

Cada spec é **independente**: os que precisam de um usuário existente o criam num hook `before` (via o comando compartilhado `cy.setup_user`) e removem no `after`. Assim os arquivos podem rodar isoladamente e em qualquer ordem, sem depender uns dos outros.

Os dados enviados nas requisições ficam em [cypress/fixtures/User.json](cypress/fixtures/User.json).
