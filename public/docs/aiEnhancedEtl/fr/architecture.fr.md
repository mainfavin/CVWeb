## Architecture et Conception

Le système adopte le modèle **Domaine–Application–Infrastructure (DAI)** afin de garantir clarté et évolutivité :

- **Domaine** — Définit les entités, les configurations et la logique principale de l’ETL.  
- **Application** — Coordonne l’exécution du pipeline, la concurrence et la communication entre modules.  
- **Infrastructure** — Implémente les chargeurs, découpeurs, générateurs d’embeddings, descripteurs, adaptateurs et connecteurs externes.

### Architecture Conteneurisée

Chaque service s’exécute dans son propre conteneur :
- `etl_app` → Processus ETL principal (Python 3.13)  
- `ollama_etl` → Service local d’inférence LLM  
- `qdrant` → Base de données vectorielle pour les embeddings  
- Frontend optionnel (par exemple : Streamlit) pour une interaction visuelle  

Cette **architecture conteneurisée** assure la reproductibilité, le déploiement modulaire et la mise à l’échelle parallèle.

### Composants Principaux

| Composant | Fonction |
|------------|-----------|
| **Loaders** | Extraient les données à partir de répertoires multimédias locaux. |
| **Splitters** | Segmentent les médias longs en clips configurables à l’aide de MoviePy/ffmpeg. |
| **Describers** | Génèrent des descriptions sémantiques grâce aux LLMs (GPT-4, LLaMA). |
| **Embedders** | Créent des embeddings multimodaux (Clip4Clip, Wav2Vec, MiniLM). |
| **Adapters** | Sérialisent et téléchargent les données vers Qdrant sous forme de points multivectoriels. |

### Choix de Conception

- **Configuration basée sur YAML :** permet des environnements reproductibles et lisibles par l’homme.  
- **Validation via JSON Schema :** empêche les configurations incorrectes.  
- **Exécution Concurrente :** gérée par la classe `Multipipeline` pour les exécutions ETL parallèles.  
- **Interface de Modèle Extensible :** tout nouveau modèle ou modalité peut être intégré en sous-classant les interfaces existantes.

<p>
  <img src="/images/projects/ai-etl-system/etlAch.png"
       alt="Schéma général des conteneurs"
       style="max-width:100%;height:auto;display:block;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.03)" />
    <figcaption> Fig. 1 : Structure générale des modules et des conteneurs.</figcaption>
</p>
