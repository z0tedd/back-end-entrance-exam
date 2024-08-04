const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "eBird in-memory cache api",
      version: "1.0.0",
      description: "API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Локальный сервер",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
