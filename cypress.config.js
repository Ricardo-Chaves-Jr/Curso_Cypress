const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Reporter que gera um relatório HTML com todos os testes executados.
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Relatório de Testes - Curso Cypress",
    charts: true,
    embeddedScreenshots: true, // embute os screenshots de falha no próprio HTML
    inlineAssets: true, // gera um HTML único, fácil de compartilhar/baixar
    overwrite: false,
  },

  // Evidências de execução.
  screenshotOnRunFailure: true, // captura screenshot automaticamente quando um teste falha
  video: true, // grava o vídeo da execução (útil para depurar falhas no CI)

  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
  env: {
    // URL base da API. Pode ser sobrescrita via cypress.env.json,
    // variável de ambiente CYPRESS_apiUrl ou --env apiUrl=...
    apiUrl: "https://serverest.dev",
  },
});
