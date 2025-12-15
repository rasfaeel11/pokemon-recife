import axios from 'axios';
import { LocationGateway } from '../../domain/gateways/LocationGateway';
import { BiomeType } from '../../domain/entities/Biome';

export class OverpassLocationGateway implements LocationGateway {
    
    private readonly OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

    async getBiomeFromLocation(lat: number, long: number): Promise<BiomeType> {
        console.log(`\n🔵 [DEBUG] Buscando em: ${lat}, ${long}`);

        const query = `
            [out:json][timeout:10];
            (
              nwr(around:120, ${lat}, ${long})["name"];    
              nwr(around:120, ${lat}, ${long})["leisure"]; 
              nwr(around:120, ${lat}, ${long})["sport"];   
              nwr(around:120, ${lat}, ${long})["landuse"]; 
              nwr(around:120, ${lat}, ${long})["natural"]; 
              nwr(around:120, ${lat}, ${long})["tourism"];
            );
            out tags;
        `;

        try {
            const response = await axios.get(this.OVERPASS_URL, { params: { data: query } });
            const elements = response.data.elements;

            // Debug visual
            const nomesEncontrados = elements.map((e: any) => e.tags.name).filter((n: any) => n);
            if (nomesEncontrados.length > 0) {
                 console.log("📜 Nomes vistos:", nomesEncontrados.slice(0, 5)); 
            }

            if (elements.length === 0) return 'RESIDENTIAL';

            const foundTags = elements.map((e: any) => e.tags);

            const check = (keyword: string) => {
                return foundTags.some((t: any) => {
                    if (!t.name) return false;
                    const fullName = `${t.name} ${t.alt_name || ''}`.toLowerCase();
                    return fullName.includes(keyword.toLowerCase());
                });
            };

            // --- REGRAS DE DETECÇÃO (A ORDEM IMPORTA MUITO!) ---

            // 1. RECIFE ANTIGO (O mais específico de todos)
            if (check('Marco Zero') || check('Bom Jesus') || check('Recife Antigo') || check('Paço do Frevo') || check('Arsenal')) {
                console.log("✅ Detectado: RECIFE_ANTIGO");
                return 'RECIFE_ANTIGO';
            }

            // 2. AGAMENON / DERBY (Subiu para Prioridade 2!)
            // Motivo: O Derby fica perto do Centro. Se checar Centro antes, ele rouba a vaga.
            // Aqui garantimos: Se for Derby ou Agamenon, É TOXIC/AGAMENON.
            if (
                check('Agamenon') || 
                check('Derby') || 
                check('Praça do Derby') || 
                check('Paissandu')
            ) {
                console.log("✅ Detectado: AGAMENON");
                return 'AGAMENON';
            }

            // 3. CENTRO (Geral)
            if (
                check('Mercado de São José') || check('Pátio de São Pedro') || check('Santo Antônio') || 
                check('São José') || check('Boa Vista') || check('Dantas Barreto') || check('Guararapes') ||
                check('Conde da Boa Vista') || check('Rua Nova') || check('Imperatriz') ||
                check('Duque de Caxias') || check('Futurista') || check('Diario de Pernambuco')
            ) {
                console.log("✅ Detectado: CENTRO");
                return 'CENTRO';
            }

            // 4. OLINDA
            if (check('Olinda') || check('Alto da Sé') || check('Quatro Cantos') || check('Mosteiro de São Bento')) {
                console.log("✅ Detectado: OLINDA");
                return 'OLINDA';
            }

            // 5. ESTÁDIOS
            if (check('Ilha do Retiro') || check('Adelmar') || check('Sport Club')) {
                console.log("✅ Detectado: SPORT");
                return 'SPORT';
            }
            if (
                check('Aflitos') || check('Eládio de Barros') || check('Nautico') || check('Náutico') || 
                check('Alberto Paiva') || check('Manuel de Carvalho') || check('Angustura') || check('Doze de Outubro')
            ) {
                console.log("✅ Detectado: NAUTICO");
                return 'NAUTICO';
            }
            if (check('Arruda') || check('Rego Maciel') || check('Mundão') || check('José do Rego')) {
                console.log("✅ Detectado: ARRUDA");
                return 'ARRUDA';
            }

            // 6. BAIRROS E LOCAIS
            if (check('Brennand') || check('Castelo São João') || check('Várzea')) {
                console.log("✅ Detectado: BRENNAND");
                return 'BRENNAND';
            }

            // BEIRA RIO
            if (
                check('Beira Rio') || 
                check('Madalena') || 
                check('José Bonifácio') || 
                check('Torre') || 
                check('Real da Torre')
            ) {
                console.log("✅ Detectado: BEIRA_RIO");
                return 'BEIRA_RIO';
            }

            if (check('Jaqueira') || (check('Jaqueira') && foundTags.some((t:any) => t.leisure === 'park'))) return 'JAQUEIRA';
            if (check('Casa Forte')) return 'CASA_FORTE';
            if (check('Graças') || check('Rui Barbosa') || check('Agnes Erskine')) return 'GRACAS';

            // --- FALLBACKS ---
            if (foundTags.some((t: any) => t.leisure === 'park' || t.leisure === 'stadium')) return 'PARK';
            if (foundTags.some((t: any) => t.natural === 'beach' || t.natural === 'sand')) return 'BEACH';
            if (foundTags.some((t: any) => t.landuse === 'industrial')) return 'INDUSTRIAL';
            if (foundTags.some((t: any) => t.natural === 'water')) return 'WATER';

            return 'RESIDENTIAL';

        } catch (error) {
            console.error("Erro Overpass:", error);
            return 'RESIDENTIAL';
        }
    }
}