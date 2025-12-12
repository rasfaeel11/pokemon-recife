import { BiomeType } from "./Biome";

export class Creature {
    constructor(
        protected readonly id: number,
        protected name: string,
        protected biome: BiomeType[],
        public rare: number,
    ){
        if(rare < 0 || rare > 100){
            throw new Error(`A raridade da criatura ${name} é inválida: ${rare}. Deve ser entre 0 e 100.`);
        }
    }
}