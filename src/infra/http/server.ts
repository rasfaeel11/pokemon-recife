import express from 'express';
import { PostgresCreatureRepository } from '../database/postgresCreatureRepository';
import { OverpassLocationGateway } from '../geodata/OverpassLocationGateway'; 
import { SpawnController } from './controllers/SpawnController';
import { SpawnCreatureAtLocation } from '../../application/SpawnCreatureatLocation';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const repository = new PostgresCreatureRepository();
const locationGateway = new OverpassLocationGateway(); 


const spawnUseCase = new SpawnCreatureAtLocation(locationGateway, repository);


const spawnController = new SpawnController(spawnUseCase);



/**
 * @swagger
 * /spawn:
 *   get:
 *     summary: Gera um Pokémon baseado na localização
 *     tags:
 *       - Pokémon
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: "Latitude (Ex: -8.0630 para Ilha do Retiro)"
 *
 *       - in: query
 *         name: long
 *         schema:
 *           type: number
 *         required: true
 *         description: "Longitude (Ex: -34.9030 para Ilha do Retiro)"
 *
 *     responses:
 *       200:
 *         description: Pokémon encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pokemon:
 *                   type: object
 *                 location_biome:
 *                   type: string
 */
app.get('/spawn', spawnController.handle.bind(spawnController));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Pokémon Recife GO rodando na porta ${PORT}`);

});