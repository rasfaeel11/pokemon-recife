import axios from 'axios';
import { LocationGateway } from '../../domain/gateways/LocationGateway';
import { BiomeType } from '../../domain/entities/Biome';

export class OverpassLocationGateway implements LocationGateway {
    
    private readonly OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

    async getBiomeFromLocation(lat: number, long: number): Promise<BiomeType> {
        const query = `
            [out:json];
            (
              way(around:200, ${lat}, ${long})["natural"~"beach|sand|coastline"];
              way(around:200, ${lat}, ${long})["leisure"~"park|garden"];
              way(around:200, ${lat}, ${long})["place"="square"];
              way(around:100, ${lat}, ${long})["natural"="water"];
              way(around:200, ${lat}, ${long})["landuse"~"industrial|harbour"];
            );
            out tags;
        `;

        try {
            const response = await axios.get(this.OVERPASS_URL, {
                params: { data: query }
            });

            const elements = response.data.elements;

            if (elements.length === 0) {
                return 'RESIDENTIAL';
            }

        
            const foundTags = elements.map((e: any) => e.tags);


            const hasBeach = foundTags.some((t: any) => 
                t.natural === 'beach' || t.natural === 'sand' || t.natural === 'coastline'
            );
            if (hasBeach) return 'BEACH';

            const hasPark = foundTags.some((t: any) => 
                t.leisure === 'park' || t.leisure === 'garden' || t.place === 'square'
            );
            if (hasPark) return 'PARK';

            const hasIndustrial = foundTags.some((t: any) => 
                t.landuse === 'industrial' || t.landuse === 'harbour'
            );
            if (hasIndustrial) return 'INDUSTRIAL';

            const hasWater = foundTags.some((t: any) => t.natural === 'water');
            if (hasWater) return 'WATER';

            return 'RESIDENTIAL';

        } catch (error) {
            console.error("Erro Overpass:", error);
            return 'RESIDENTIAL';
        }
}
}