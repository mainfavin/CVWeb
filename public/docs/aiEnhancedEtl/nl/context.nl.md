## Context en Motivatie

Moderne data-ecosystemen produceren enorme hoeveelheden ongestructureerde informatie — video’s, audio en vrije tekst zonder consistente metadata.  
Deze diversiteit veroorzaakt een knelpunt voor teams die inhoud efficiënt moeten integreren, analyseren of doorzoeken.

Het **AI-Enhanced ETL System** is ontstaan uit die uitdaging: het bouwen van een **plug-and-play-engine** die een volledige ETL-workflow (Extract–Transform–Load) op ongestructureerde gegevens kan uitvoeren met behulp van **generatieve AI en multimodale modellen**.

In tegenstelling tot traditionele ETL-tools, die zich richten op gestructureerde gegevens en vaste schema’s, integreert dit project **AI-gestuurde transcriptie, beschrijving en embedding-generatie** om multimediagegevens semantisch te verrijken.

Het resultaat is een systeem dat:
- Automatisch video-, audio- en tekstbestanden verwerkt.  
- Embeddings genereert en deze opslaat in een vectordatabank voor gelijkeniszoekopdrachten.  
- Een **gebruiksvriendelijke interface** biedt via YAML-configuratie of een **conversatie-assistent**.  

De visie: AI-aangedreven datapijplijnen toegankelijk maken voor zowel ontwikkelaars als niet-technische gebruikers via modulaire ontwerpen en intelligente automatisering.

---

## Reikwijdte

Het project omvat drie hoofdcomponenten, elk uitgevoerd in een eigen Docker-container:

1. **Conversatie-assistent** — Begeleidt gebruikers bij de configuratie en genereert YAML-pijplijndefinities.  
2. **ETL-engine** — Orkestreert extractie, transformatie en laden via modulaire pijplijnen.  
3. **Vectordatabank (Qdrant)** — Slaat multimodale embeddings en metadata op, waarmee semantisch zoeken mogelijk wordt.

Elke component kan onafhankelijk draaien, wat zorgt voor een schone integratie en schaalbaarheid.
