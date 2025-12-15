import { BiomeType } from "../entities/Biome";
import { Creature } from "../entities/creature";

export interface CreatureRepository {
  findByBiome(biome: BiomeType): Promise<Creature[]>;
}