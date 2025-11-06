## Flux ETL

### 1. Extraction
Les fichiers multimédias sont chargés à partir du répertoire `media/`.  
Les chargeurs détectent les fichiers valides (vidéo, audio, texte) et initialisent leurs pipelines de traitement.

### 2. Transformation
Chaque pipeline effectue :
- **Découpage (Splitting)** — Divise les fichiers vidéo/audio en clips plus courts.  
- **Transcription** — Convertit l’audio en texte à l’aide de Whisper.  
- **Description** — Résume les scènes ou segments via des LLMs.  
- **Génération d’Embeddings** — Produit des représentations vectorielles pour toutes les modalités.  

Cette étape enrichit le contenu non structuré avec des métadonnées sémantiques et textuelles.

### 3. Chargement
Les adaptateurs sérialisent les embeddings et les métadonnées sous forme de `Points` compatibles avec les collections multivectorielles de Qdrant.  
Chaque `Point` peut inclure :
- Des embeddings de texte (description, transcription)  
- Des embeddings audio ou vidéo  
- Des métadonnées structurées (source, horodatage, langue)

Une fois stockés, ces points peuvent être interrogés via une recherche de similarité ou utilisés comme contexte pour la **RAG (Retrieval-Augmented Generation)**.

### Exemple
```bash
# Exécuter l’image précompilée  
docker pull papimarkiss/ai-enhanced-etl:stable  
docker compose up -d  
```
Cette commande lance :

- Le moteur ETL  
- Le conteneur d’inférence locale  
- La base de données vectorielle Qdrant  

<p>
  <img src="/images/projects/ai-etl-system/infraMul.png"
       alt="Schéma général des conteneurs"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figcaption> Fig. 2 : Diagramme de l’architecture fonctionnelle du système ETL.</figcaption>

  <img src="/images/projects/ai-etl-system/pipDes.png"
       alt="Processus interne du pipeline"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:#e9ecef" />
    <figcaption> Fig. 3 : Processus interne générique du pipeline.</figcaption>
</p>
