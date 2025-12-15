import { BiomeType } from "../entities/Biome";
import { Creature } from "../entities/Creature";

export interface CreatureRepository {
  findByBiome(biome: BiomeType): Promise<Creature[]>;
}