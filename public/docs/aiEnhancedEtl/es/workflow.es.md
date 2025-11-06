## Flujo ETL

### 1. Extracción
Los archivos multimedia se cargan desde el directorio `media/`.  
Los cargadores detectan archivos válidos (vídeo, audio, texto) e inicializan sus pipelines de procesamiento.

### 2. Transformación
Cada pipeline realiza:
- **División (Splitting)** — Separa los vídeos o audios en clips más pequeños.  
- **Transcripción** — Convierte el audio a texto usando Whisper.  
- **Descripción** — Resume escenas o segmentos mediante LLMs.  
- **Generación de Embeddings** — Produce representaciones vectoriales para todas las modalidades.  

Esta fase enriquece el contenido no estructurado con metadatos semánticos y textuales.

### 3. Carga
Los adaptadores serializan los embeddings y metadatos como `Points` compatibles con las colecciones multivectoriales de Qdrant.  
Cada `Point` puede incluir:
- Embeddings de texto (descripción, transcripción)  
- Embeddings de audio o vídeo  
- Metadatos estructurados (fuente, marcas de tiempo, idioma)

Una vez almacenados, estos pueden consultarse mediante **búsqueda por similitud** o emplearse como contexto para **RAG (Retrieval-Augmented Generation)**.

### Ejemplo
```bash
# Ejecutar la imagen precompilada
docker pull papimarkiss/ai-enhanced-etl:stable
docker compose up -d
```
Este comando lanza:

- El motor ETL
- El contenedor de inferencia local
- La base de datos vectorial Qdrant

<p> <img src="/images/projects/ai-etl-system/infraMul.png" alt="Diseño general del contenedor" style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" /> <figcaption>Fig. 2: Diagrama de la arquitectura funcional del sistema ETL.</figcaption>

<img src="/images/projects/ai-etl-system/pipDes.png" alt="Proceso interno del pipeline" style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
<figcaption>Fig. 3: Proceso interno genérico del pipeline.</figcaption>

</p> 