## Architecture & Design

The system adopts a **Domain–Application–Infrastructure (DAI)** pattern for clarity and scalability:

- **Domain** — Defines entities, configurations, and the core ETL logic.
- **Application** — Coordinates pipeline execution, concurrency, and inter-module communication.
- **Infrastructure** — Implements loaders, splitters, embedders, describers, adapters, and external connectors.

### Containerized Architecture

Each service runs in its own container:
- `etl_app` → Main ETL process (Python 3.13)
- `ollama_etl` → Local LLM inference service
- `qdrant` → Vector database for embeddings
- Optional frontend (e.g. Streamlit) for visual interaction

This **containerized architecture** ensures reproducibility, modular deployment, and parallel scalability.

### Core Components

| Component | Purpose |
|------------|----------|
| **Loaders** | Extract data from local media directories. |
| **Splitters** | Segment long media into configurable clips using MoviePy/ffmpeg. |
| **Describers** | Generate semantic descriptions with LLMs (GPT-4, LLaMA). |
| **Embedders** | Create multimodal embeddings (Clip4Clip, Wav2Vec, MiniLM). |
| **Adapters** | Serialize and upload data into Qdrant as multi-vector points. |

### Design Decisions

- **YAML-based Configuration:** Enables reproducible, human-readable setups.  
- **JSON Schema Validation:** Prevents malformed configurations.  
- **Concurrent Execution:** Managed by the `Multipipeline` class for parallel ETL runs.  
- **Extensible Model Interface:** Any new model or modality can be integrated by subclassing existing interfaces.


<p>
  <img src="/images/projects/ai-etl-system/etlAch.png"
       alt="General container design"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.03)" />
    <figcaption> Fig 1:  General structure of modules and containers.</figcaption>
</p>

