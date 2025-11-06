## ETL-Workflow

### 1. Extractie
Mediabestanden worden geladen vanuit de map `media/`.  
Loaders detecteren geldige bestanden (video, audio, tekst) en initialiseren hun verwerkingspijplijnen.

### 2. Transformatie
Elke pijplijn voert de volgende stappen uit:
- **Splitsen** — Verdeelt video’s of audio in kleinere clips.  
- **Transcriptie** — Zet audio om naar tekst met behulp van Whisper.  
- **Beschrijving** — Vat scènes of segmenten samen met LLM’s.  
- **Embeddinggeneratie** — Maakt vectorrepresentaties voor alle modaliteiten.  

Deze fase verrijkt ongestructureerde inhoud met semantische en tekstuele metadata.

### 3. Laden
Adapters serialiseren embeddings en metadata als `Points` die compatibel zijn met Qdrants multivectorcollecties.  
Elk `Point` kan bevatten:
- Tekstembeddings (beschrijving, transcriptie)  
- Audio- of video-embeddings  
- Gestructureerde metadata (bron, tijdstempels, taal)

Zodra ze zijn opgeslagen, kunnen deze worden opgevraagd via **gelijkeniszoekopdrachten** of worden gebruikt als context voor **RAG (Retrieval-Augmented Generation)**.

### Voorbeeld
```bash
# Vooraf gebouwde image uitvoeren  
docker pull papimarkiss/ai-enhanced-etl:stable  
docker compose up -d  
```
Deze opdracht start:

- De ETL-engine  
- De lokale inferentiecontainer  
- De Qdrant-vectordatabank  

<p>
  <img src="/images/projects/ai-etl-system/infraMul.png"
       alt="Algemeen ontwerp van containers"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figcaption> Fig. 2 : Diagram van de functionele architectuur van het ETL-systeem.</figcaption>

  <img src="/images/projects/ai-etl-system/pipDes.png"
       alt="Intern pijplijnproces"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figcaption> Fig. 3 : Generiek intern proces van de pijplijn.</figcaption>
</p>
