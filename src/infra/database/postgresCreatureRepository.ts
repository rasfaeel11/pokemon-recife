import { Pool } from 'pg';
import 'dotenv/config'; // Carrega as variáveis do .env
import { CreatureRepository } from '../../domain/repositories/CreatureRepository';
import { BiomeType } from '../../domain/entities/Biome';
import { Creature } from '../../domain/entities/creature';

export class PostgresCreatureRepository implements CreatureRepository {
    private pool: Pool;

    constructor() {
        // Cria a conexão usando a string que está no arquivo .env
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false } // Necessário para conectar no Supabase
        });
    }

    async findByBiome(biome: BiomeType): Promise<Creature[]> {
        // Query SQL Crua
        // Tradução: "Selecione tudo de creatures onde o bioma passado ($1) esteja DENTRO de qualquer um (ANY) do array 'biomes' salvo no banco"
        const query = `
            SELECT id, name, biomes, rare 
            FROM creatures 
            WHERE $1 = ANY(biomes)
        `;

        try {
            const result = await this.pool.query(query, [biome]);

            // O Banco devolve dados brutos (linhas). Precisamos transformar em Instâncias da nossa classe Creature.
            // Isso é chamado de "Mapeamento" (Data Mapper).
            return result.rows.map(row => new Creature(
                row.id,
                row.name,
                row.biomes as BiomeType[], // O Postgres devolve array de string, fazemos cast para nosso tipo
                row.rare
            ));

        } catch (error) {
            console.error('Erro no banco de dados:', error);
            return []; // Em caso de erro, retorna lista vazia para não derrubar o server
        }
    }
}