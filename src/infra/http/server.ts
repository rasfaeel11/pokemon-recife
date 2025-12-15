import express from 'express';
import { PostgresCreatureRepository } from '../database/postgresCreatureRepository';
import { OverpassLocationGateway } from '../geodata/OverpassLocationGateway'; // <--- Novo
import { SpawnController } from './controllers/SpawnController';
import { SpawnCreatureAtLocation } from '../../application/SpawnCreatureatLocation';

const app = express();
app.use(express.json());




const repository = new PostgresCreatureRepository();
const locationGateway = new OverpassLocationGateway(); 


const spawnUseCase = new SpawnCreatureAtLocation(locationGateway, repository);


const spawnController = new SpawnController(spawnUseCase);


app.get('/spawn', spawnController.handle.bind(spawnController));


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Pokémon Recife GO rodando na porta ${PORT}`);
    console.log(`Parque da Jaqueira: http://localhost:3000/spawn?lat=-8.0376&long=-34.9036`);
    console.log(`Boa Viagem: http://localhost:3000/spawn?lat=-8.1274&long=-34.8995`);
});