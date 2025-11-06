## Architectuur en Ontwerp

Het systeem volgt het **Domein–Applicatie–Infrastructuur (DAI)**-patroon voor duidelijkheid en schaalbaarheid:

- **Domein** — Definieert entiteiten, configuraties en de kern-ETL-logica.  
- **Applicatie** — Coördineert de uitvoering van de pijplijn, gelijktijdigheid en communicatie tussen modules.  
- **Infrastructuur** — Implementeert laders, splitters, embedders, beschrijvers, adapters en externe connectoren.

### Gecontaineriseerde Architectuur

Elke service draait in zijn eigen container:
- `etl_app` → Hoofd-ETL-proces (Python 3.13)  
- `ollama_etl` → Lokale LLM-inferentieservice  
- `qdrant` → Vector-database voor embeddings  
- Optionele frontend (bijv. Streamlit) voor visuele interactie  

Deze **gecontaineriseerde architectuur** garandeert reproduceerbaarheid, modulaire implementatie en parallelle schaalbaarheid.

### Belangrijkste Componenten

| Component | Doel |
|------------|------|
| **Loaders** | Haalt gegevens op uit lokale mediabestanden. |
| **Splitters** | Verdeelt lange mediabestanden in configureerbare clips met MoviePy/ffmpeg. |
| **Describers** | Genereert semantische beschrijvingen met LLM’s (GPT-4, LLaMA). |
| **Embedders** | Maakt multimodale embeddings (Clip4Clip, Wav2Vec, MiniLM). |
| **Adapters** | Serialiseert en uploadt gegevens naar Qdrant als multivector-punten. |

### Ontwerpkeuzes

- **YAML-gebaseerde Configuratie:** maakt reproduceerbare, mensleesbare omgevingen mogelijk.  
- **JSON Schema-validatie:** voorkomt foutieve configuraties.  
- **Gelijktijdige Uitvoering:** beheerd door de klasse `Multipipeline` voor parallelle ETL-taken.  
- **Uitbreidbare Modelinterface:** nieuwe modellen of modaliteiten kunnen worden geïntegreerd door bestaande interfaces uit te breiden.

<p>
  <img src="/images/projects/ai-etl-system/etlAch.png"
       alt="Algemeen ontwerp van containers"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.03)" />
    <figcaption> Fig. 1 : Algemene structuur van modules en containers.</figcaption>
</p>
