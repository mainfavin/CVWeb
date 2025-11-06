## Arquitectura y Diseño

El sistema adopta un patrón **Dominio–Aplicación–Infraestructura (DAI)** para garantizar claridad y escalabilidad:

- **Dominio** — Define las entidades, configuraciones y la lógica principal del ETL.  
- **Aplicación** — Coordina la ejecución del pipeline, la concurrencia y la comunicación entre módulos.  
- **Infraestructura** — Implementa los cargadores, divisores, embedders, descriptores, adaptadores y conectores externos.

### Arquitectura Contenerizada

Cada servicio se ejecuta en su propio contenedor:
- `etl_app` → Proceso ETL principal (Python 3.13)
- `ollama_etl` → Servicio local de inferencia LLM
- `qdrant` → Base de datos vectorial para embeddings
- Frontend opcional (por ejemplo, Streamlit) para la interacción visual

Esta **arquitectura contenerizada** garantiza reproducibilidad, despliegue modular y escalabilidad paralela.

### Componentes Principales

| Componente | Propósito |
|-------------|-----------|
| **Loaders** | Extraen datos desde directorios multimedia locales. |
| **Splitters** | Dividen archivos largos en clips configurables mediante MoviePy/ffmpeg. |
| **Describers** | Generan descripciones semánticas con LLMs (GPT-4, LLaMA). |
| **Embedders** | Crean embeddings multimodales (Clip4Clip, Wav2Vec, MiniLM). |
| **Adapters** | Serializan y cargan los datos en Qdrant como puntos multivectoriales. |

### Decisiones de Diseño

- **Configuración basada en YAML:** permite entornos reproducibles y legibles para humanos.  
- **Validación mediante JSON Schema:** evita configuraciones mal formadas.  
- **Ejecución Concurrente:** gestionada por la clase `Multipipeline` para ejecuciones ETL paralelas.  
- **Interfaz de Modelos Extensible:** cualquier nuevo modelo o modalidad puede integrarse mediante herencia de interfaces existentes.


<p>
  <img src="/images/projects/ai-etl-system/etlAch.png"
       alt="Diseño general de contenedores"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.03)" />
    <figcaption> Fig 1:  General structure of modules and containers.</figcaption>
</p>
