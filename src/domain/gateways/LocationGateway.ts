import { BiomeType } from "../entities/Biome";
export interface LocationGateway{
    getBiomeFromLocation(lat: number, long: number): Promise<BiomeType>;
}