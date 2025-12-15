import { Pool } from 'pg';
import 'dotenv/config'; // Carrega as variáveis do .env
import { CreatureRepository } from '../../domain/repositories/CreatureRepository';
import { BiomeType } from '../../domain/entities/Biome';
import { Creature } from '../../domain/entities/creature';

export class PostgresCreatureRepository implements CreatureRepository {
    private pool: Pool;

    constructor() {

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false } 
        });
    }

    async findByBiome(biome: BiomeType): Promise<Creature[]> {
        
        const query = `
            SELECT id, name, biomes, rare 
            FROM creatures 
            WHERE $1 = ANY(biomes)
        `;

        try {
            const result = await this.pool.query(query, [biome]);

           
            return result.rows.map(row => new Creature(
                row.id,
                row.name,
                row.biomes as BiomeType[], 
                row.rare
            ));

        } catch (error) {
            console.error('Erro no banco de dados:', error);
            return []; 
        }
    }
}