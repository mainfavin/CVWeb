## Contexte et Motivation

Les écosystèmes de données modernes produisent d’énormes volumes d’informations non structurées — vidéos, audio et texte libre sans métadonnées cohérentes.  
Cette diversité crée un véritable goulot d’étranglement pour les équipes qui doivent intégrer, analyser ou rechercher efficacement du contenu.

Le **système ETL amélioré par l’IA (AI-Enhanced ETL System)** est né de ce défi : créer un **moteur prêt à l’emploi** capable d’exécuter un flux ETL complet (Extract–Transform–Load) sur des données non structurées en utilisant **l’IA générative et des modèles multimodaux**.

Contrairement aux outils ETL traditionnels, qui se concentrent sur des données structurées et des schémas fixes, ce projet intègre la **transcription, la description et la génération d’embeddings pilotées par l’IA**, afin d’enrichir le contenu multimédia avec une compréhension sémantique.

Le résultat est un système qui :
- Traite automatiquement la vidéo, l’audio et le texte.  
- Génère des embeddings et les stocke dans une base de données vectorielle pour la recherche par similarité.  
- Offre une **interface conviviale** via la configuration YAML ou un **assistant conversationnel**.  

La vision : mettre les pipelines de données alimentés par l’IA à la portée des développeurs comme des utilisateurs non techniques, grâce à une conception modulaire et une automatisation intelligente.

---

## Portée

Le projet comprend trois composants principaux, chacun déployé dans son propre conteneur Docker :

1. **Assistant Conversationnel** — Guide les utilisateurs dans la configuration et génère les définitions de pipeline YAML.  
2. **Moteur ETL** — Orchestre l’extraction, la transformation et le chargement via des pipelines modulaires.  
3. **Base de Données Vectorielle (Qdrant)** — Stocke les embeddings multimodaux et les métadonnées, permettant la recherche sémantique.

Chaque composant peut fonctionner indépendamment, garantissant une intégration propre et une évolutivité optimale.
