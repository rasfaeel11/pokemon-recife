import { Request, Response } from 'express';
import { SpawnCreatureAtLocation } from '../../../application/SpawnCreatureatLocation';

export class SpawnController {
    // Note que agora injetamos o NOVO caso de uso
    constructor(private spawnUseCase: SpawnCreatureAtLocation) {}

    async handle(req: Request, res: Response) {
        // Recebemos lat e long da URL
        // Ex: /spawn?lat=-8.0376&long=-34.9036
        const { lat, long } = req.query;

        // Validação básica
        if (!lat || !long) {
            return res.status(400).json({ error: 'Faltou lat ou long na URL.' });
        }

        try {
            // Convertemos string para number
            const latitude = parseFloat(lat as string);
            const longitude = parseFloat(long as string);

            const creature = await this.spawnUseCase.execute(latitude, longitude);

            if (!creature) {
                return res.status(200).json({ 
                    message: 'Você olha ao redor, mas não vê nada interessante aqui.',
                    details: 'Bioma vazio ou sem criaturas cadastradas.'
                });
            }

            // Retorno bonito
            return res.json({
                message: `Um ${creature.name} selvagem apareceu!`,
                creature: creature
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao processar spawn.' });
        }
    }
}