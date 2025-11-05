## ETL Workflow

### 1. Extraction
Media files are loaded from the `media/` directory.  
Loaders detect valid files (video, audio, text) and initialize their processing pipelines.

### 2. Transformation
Each pipeline performs:
- **Splitting** — Divides video/audio into smaller clips.  
- **Transcription** — Converts audio to text using Whisper.  
- **Description** — Summarizes scenes or segments via LLMs.  
- **Embedding Generation** — Produces vector representations for all modalities.  

This stage enriches unstructured content with semantic and textual metadata.

### 3. Loading
Adapters serialize embeddings and metadata as `Points` compatible with Qdrant’s multi-vector collections.  
Each `Point` may include:
- Text embeddings (description, transcription)  
- Audio or video embeddings  
- Structured metadata (source, timestamps, language)

Once stored, these can be queried through similarity search or used as context for RAG (Retrieval-Augmented Generation).

### Example
```bash
# Run prebuilt image
docker pull papimarkiss/ai-enhanced-etl:stable
docker compose up -d
```
This command launches:

- The ETL engine
- The local inference container
- The Qdrant vector database

<p>
  <img src="/images/projects/ai-etl-system/infraMul.png"
       alt="General container design"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figacaption> Fig 2: Diagram of the functional architecture of the ETL system.</figcaption>

  <img src="/images/projects/ai-etl-system/pipDes.png"
       alt="General container design"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figacaption> Fig 3: Pipeline internal process (generic).</figcaption>
</p>
