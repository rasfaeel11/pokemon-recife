import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recife Pokémon GO API 🦀',
      version: '1.0.0',
      description: 'API de geração de Pokémons baseada em geolocalização real do Recife (Sport, Náutico, Santa, Brennand, etc).',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  apis: ['src/infra/http/server.ts'], 
};

export const specs = swaggerJsdoc(options);