# 🦀 Recife Pokémon GO API

Uma API RESTful baseada em geolocalização que simula o aparecimento de Pokémons no mundo real, mas com um toque especial:  
**o mapa é focado na cultura e geografia de Recife e Olinda!**

O sistema utiliza a **Overpass API (OpenStreetMap)** para detectar onde o jogador está e decide qual Pokémon aparece com base em regras customizadas, por exemplo:

- Leões na Ilha do Retiro  
- Fantasmas no Centro Histórico  
- Caranguejos no Mangue  

---

## 🚀 Tecnologias

- **Node.js** & **TypeScript**
- **Express** — Servidor Web
- **PostgreSQL / Supabase** — Banco de Dados
- **Overpass API** — Dados geográficos em tempo real
- **Axios** — Requisições HTTP

---

## 🗺️ Biomas & Lógica Regional

A grande sacada deste projeto é o mapeamento de **micro-biomas de Recife**.  
O jogo não detecta apenas "Parque" ou "Água", ele entende **a alma da cidade**.

| Bioma | Localização Real | Pokémons Típicos | Motivo |
|------|-----------------|-----------------|--------|
| **SPORT** | Ilha do Retiro | Solgaleo, Luxray, Pyroar | Mascote do time é o Leão 🦁 |
| **NAUTICO** | Aflitos | Raticate, Yungoos, Furret | Mascote Timbu (Gambá/Rato) 🐭 |
| **ARRUDA** | Arruda | Seviper, Onix, Krookodile | Cobra Coral e estádio de concreto 🐍 |
| **CENTRO** | São José, Boa Vista | Gengar, Banette, Duskull | Igrejas antigas e lendas urbanas 👻 |
| **AGAMENON** | Av. Agamenon / Derby | Muk, Weezing, Trubbish | Poluição e trânsito ☠️ |
| **BRENNAND** | Instituto Ricardo Brennand | Aegislash, Honedge, Dragonite | Castelo medieval ⚔️ |
| **OLINDA** | Alto da Sé, Carmo | Hoopa, Mr. Mime, Ludicolo | Magia, Carnaval e Bonecos 🎭 |
| **BEIRA_RIO** | Torre, Madalena | Persian, Purugly, Yanma | Área nobre + Rio Capibaribe 🐱 |
| **JAQUEIRA** | Parque da Jaqueira | Vileplume, Butterfree, Exeggutor | Área verde 🌳 |
| **MANGUE** | Manguezais | Krabby, Kingler, Paras | Manguebeat 🦀 |

---

📡 Como Usar (Endpoints)
🎯 Gerar Pokémon

GET /spawn

Envia latitude e longitude do jogador.
O sistema detecta o bioma e sorteia um Pokémon.

Parâmetros

lat — Latitude

long — Longitude

Exemplos

🏟️ Ilha do Retiro (Sport)
http://localhost:3000/spawn?lat=-8.0630&long=-34.9030

🇦🇹 Aflitos (Náutico)
http://localhost:3000/spawn?lat=-8.0435&long=-34.8994

🐍 Arruda (Santa Cruz)
http://localhost:3000/spawn?lat=-8.0267&long=-34.8913

⚔️ Castelo Brennand
http://localhost:3000/spawn?lat=-8.0661&long=-34.9638

☠️ Agamenon Magalhães
http://localhost:3000/spawn?lat=-8.0565&long=-34.8988

👻 Centro Histórico
http://localhost:3000/spawn?lat=-8.0683&long=-34.8797

Feito com 💙 e muito 🦀 no Recife.
