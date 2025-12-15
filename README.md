# 🦀 Recife Pokémon GO API

Uma API RESTful baseada em geolocalização que simula o aparecimento de Pokémons no mundo real, com um toque especial:
**o mapa é focado na cultura e geografia de Recife e Olinda.**

O sistema utiliza a **Overpass API (OpenStreetMap)** para detectar a localização do jogador e decidir qual Pokémon aparece com base em regras culturais e geográficas, como:

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
- **Swagger / OpenAPI 3.0** — Documentação da API

---

## 🗺️ Biomas & Lógica Regional

O diferencial do projeto é o mapeamento de **micro-biomas urbanos**, indo além de categorias genéricas e refletindo a identidade cultural da cidade.

| Bioma | Localização Real | Pokémons Típicos | Motivo |
|:------|:-----------------|:-----------------|:-------|
| **SPORT** | Ilha do Retiro | Solgaleo, Luxray, Pyroar | Mascote do time é o Leão 🦁 |
| **NAUTICO** | Aflitos | Raticate, Yungoos, Furret | Mascote Timbu (Gambá/Rato) 🐭 |
| **ARRUDA** | Arruda | Seviper, Onix, Krookodile | Cobra Coral e estádio de concreto 🐍 |
| **CENTRO** | São José, Boa Vista | Gengar, Banette, Duskull | Igrejas antigas e lendas urbanas 👻 |
| **AGAMENON** | Av. Agamenon / Derby | Muk, Weezing, Trubbish | Poluição e trânsito intenso ☠️ |
| **BRENNAND** | Instituto Ricardo Brennand | Aegislash, Honedge, Dragonite | Castelo medieval ⚔️ |
| **OLINDA** | Alto da Sé, Carmo | Hoopa, Mr. Mime, Ludicolo | Magia, Carnaval e Bonecos Gigantes 🎭 |
| **BEIRA_RIO** | Torre, Madalena | Persian, Purugly, Yanma | Área nobre e Rio Capibaribe 🐱 |
| **JAQUEIRA** | Parque da Jaqueira | Vileplume, Butterfree, Exeggutor | Área verde preservada 🌳 |
| **MANGUE** | Manguezais | Krabby, Kingler, Paras | Manguebeat 🦀 |

---

## 🛠️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/recife-pokemon-go.git
cd recife-pokemon-go
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Banco de Dados

O projeto utiliza **Supabase**. Crie a tabela `creatures`:

```sql
CREATE TABLE creatures (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    biomes TEXT[] NOT NULL,
    rare INTEGER NOT NULL
);
```

*Scripts de população podem ser encontrados em `docs/sql`.*

### 4. Executando o projeto

```bash
# Modo desenvolvimento
npx ts-node src/infra/http/server.ts
```

Servidor disponível em:
👉 `http://localhost:3000`

---

## 📚 Documentação da API (Swagger)

A API é totalmente documentada usando Swagger / OpenAPI 3.0.

Após iniciar o servidor, acesse:

👉 **http://localhost:3000/docs**

No Swagger UI você pode:
* Visualizar todos os endpoints
* Testar requisições diretamente no navegador
* Ver parâmetros, respostas e exemplos
* Validar erros (400, 404, etc.)

---

## 📡 Endpoint Principal

### 🎯 Gerar Pokémon

`GET /spawn`

Gera um Pokémon com base na latitude e longitude do jogador.

#### Parâmetros de Query

| Parâmetro | Tipo | Descrição |
|:---|:---|:---|
| `lat` | number | Latitude (ex: -8.0630) |
| `long` | number | Longitude (ex: -34.9030) |

#### Exemplos

* **Ilha do Retiro (Sport):** `http://localhost:3000/spawn?lat=-8.0630&long=-34.9030`
* **Aflitos (Náutico):** `http://localhost:3000/spawn?lat=-8.0435&long=-34.8994`
* **Castelo Brennand:** `http://localhost:3000/spawn?lat=-8.0661&long=-34.9638`

### 📤 Resposta de Exemplo

```json
{
  "pokemon": {
    "id": 105,
    "name": "Solgaleo",
    "biomes": ["SPORT"],
    "rare": 1
  },
  "location_biome": "SPORT"
}
```

---

## 🧠 Detecção de Localização (Overpass API)

A API utiliza consultas **NWR (Node, Way, Relation)** no OpenStreetMap com lógica de prioridade:

1.  **Alta prioridade:** Estádios, Castelo Brennand, Marco Zero
2.  **Média prioridade:** Avenidas principais e bairros históricos
3.  **Baixa prioridade:** Parques, praias e áreas residenciais

Palavras-chave como “Aflitos” ou ruas adjacentes forçam o bioma correspondente, garantindo precisão mesmo fora do ponto exato.

---

## 📄 Licença

Este projeto é open-source e utiliza dados do OpenStreetMap, respeitando a licença ODbL.

Feito com 💙 e muito 🦀 no Recife.
