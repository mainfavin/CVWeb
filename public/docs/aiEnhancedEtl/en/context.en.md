## Context & Motivation

Modern data ecosystems produce vast amounts of unstructured information — videos, audio, and free text lacking consistent metadata. This diversity creates a bottleneck for teams that need to integrate, analyze, or search through content efficiently.

The **AI-Enhanced ETL System** was born from that challenge: creating a **plug-and-play engine** capable of performing a complete ETL (Extract-Transform-Load) workflow on unstructured data using **generative AI and multimodal models**.

Unlike traditional ETL tools, which focus on structured data and fixed schemas, this project integrates **AI-driven transcription, description, and embedding generation** to enrich multimedia with semantic understanding.

The result is a system that:
- Processes video, audio, and text automatically.  
- Generates embeddings and stores them in a vector database for similarity search.  
- Provides a **human-friendly interface** through YAML configuration or a **conversational assistant**.  

The vision: bring AI-powered data pipelines to both developers and non-technical users through modular design and intelligent automation.

---

## Scope

The project encompasses three main components, each deployed in its own Docker container:

1. **Conversational Assistant** — Guides users through configuration and generates YAML pipeline definitions.  
2. **ETL Engine** — Orchestrates extraction, transformation, and loading using modular pipelines.  
3. **Vector Database (Qdrant)** — Stores multimodal embeddings and metadata, enabling semantic retrieval.

Each component can run independently, ensuring clean integration and scalability.
