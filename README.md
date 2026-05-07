# Bloemenveld Frankendael
Ik heb in sprint 8 de opdracht gekregen om een webapp/website te maken voor het Bloemenveld Frankendael waar bezoekers de planten kunnen ontdekken die in de bloei staan in het bloemenveld. Het doel is niet alleen om gebruikers planten laten ontdekken maar dat ze ook iets kunnen doen doormiddel van opdrachten uit te voeren waar gebruikers dan de kenmerken van een plant zien.

In sprint 10 heb ik mijn focus vooral gelegd bij de Perfomance (Prestatie) van de website voor gebruikers die een verouderde telefoon of browser hebben die moeite hebben met het inladen van de afbeeldingen. Ook heb ik gewerkt aan de Loading State en Success State van de POST op de artikel pagina.

**Developer**

In dit project werk ik in mijn eentje 

- [Tin Nguyen](https://github.com/WebTins)

## Inhoudsopgave
1. [Beschrijving](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#beschrijving)
2. [Comment plaatsen](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#comment-plaatsen)
3. [Comment verwijderen](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#comment-verwijderen)
4. [Kenmerken](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#kenmerken)
5. [Code conventies](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#code-conventies)
6. [Installatie](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/main/README.md#installatie)

## Beschrijving

[Website](https://user-experience-enhanced-website-8jvj.onrender.com/)

[WCAG Audit](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/issues/24)

**Homepage**

De website is eerst ontworpen en daarna gebouwd met data die wordt opgehaald en ook data die wordt verstuurd. De homepagina toont op dit moment de collectie van de gebruiker en nieuws artikelen die de gebruiker kan lezen. De veldverkenner laat de flipcard zien van een plant.

<img width="150" height="300" alt="mobile-black" src="https://github.com/user-attachments/assets/0d32ae1a-e99e-4b18-9b60-f6af38161bd4" />

<img width="280" height="400" alt="tablet-black" src="https://github.com/user-attachments/assets/7cba5b1e-ebb0-4699-8076-dc81821c00ff" />

> Mockup van de homepagina

---

**Veldverkenner**

Op de veldverkenner heb ik zelf de veldverkenner nog niet in staan maar wel de flipcard die kan draaien om de gehele informatie van de plant te kunnen zien

<img width="138" height="400" alt="mobile-black (1)" src="https://github.com/user-attachments/assets/1425f976-07ec-49c5-bf56-c78e3f76ae7c" />
<img width="250" height="700" alt="tablet-black (4)" src="https://github.com/user-attachments/assets/08b3f1d8-0011-47c1-94aa-6137ecf8e6bb" />


> Mockup van de veldverkenner flipcard

https://github.com/user-attachments/assets/2f780256-bca0-4399-8308-0d00ad5bd0f6

---

**Nieuwsveld**

Bij het nieuwsveld is de bedoeling dat de gebruiker alle artikelen kan zien en kan lezen wanneer ze op een artikel drukken. Ik heb de artikel pagina gemaakt waar ook alle data opgehaald wordt vanuit de database.

<img width="138" height="300" alt="mobile-black (2)" src="https://github.com/user-attachments/assets/e6ae0fa1-ff1b-453f-9a8f-15c7beab48f6" />
<img width="241" height="600" alt="tablet-black (2)" src="https://github.com/user-attachments/assets/a66de3ad-bf2e-4138-9baa-43ffc9a2415c" />

https://github.com/user-attachments/assets/bfe887e2-e4f4-4529-bc91-df3227bc589e

---

**Artikel**

Nadat je bij het nieuwsveld op een artikel heb gedrukt dan kom je bij het volledige artikel terecht waar je de details kan lezen

<img width="241" height="600" alt="tablet-black (5)" src="https://github.com/user-attachments/assets/15bb93c4-8b64-434b-a875-391333084f4b" />

## Comment plaatsen

Wanneer je een artikel aan het lezen bent is het ook fijn om je mening te kunnen delen met anderen. En ik heb in Sprint 9 mijn focus gelegd met het versturen van data doormiddel van een POST te gebruiken. Het vesturen van een comment is gemaakt met [routes](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/56360eedd883659c206f05320142d46e9406dda1/server.js#L96-L134) die in NodeJS staan.

#### <ins>Feedforward & Feedback POST</ins>

Feedforward versturen van comment:

- Er zijn nog geen opmerkingen (Empty state)
- Met een hover over de "Verstuur" knop, krijgt de knop een donkere kleur

Feedback versturen van comment:

- Empty state verdwijnt
- Er staat een opmerking met een Naam, bericht en datum

https://github.com/user-attachments/assets/096b33ef-ed77-41de-813f-d66390906aaa

## Comment verwijderen

Wanneer je een opmerking hebt/ziet die niet toepasselijk is of op spam lijkt, is het fijn om als gebruiker/admin de comment te kunnen verwijderen. Ik heb mij deze sprint ook gefocust met het verwijderen van data dat ik mogelijk heb gemaakt met een POST [routes](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/56360eedd883659c206f05320142d46e9406dda1/server.js#L96-L134) waar de DELETE method wordt gebruikt.

#### <ins>Feedforward & Feedback DELETE</ins>

Feedforward verwijderen van comment:

- Er is een opmerking
- Met een hover over de "Verwijder" knop, krijgt de knop een lichtere kleur

Feedback verwijderen van comment:

- Opmerking verwdijnt
- Als er maar 1 opmerking was en is verwijderd, dan komt de empty state tevoorschijn

https://github.com/user-attachments/assets/96d34cfa-e4cc-415c-8bef-6798d9f9eb35

## Kenmerken

In dit project is er gebruik gemaakt van HTML, CSS, JS, NodeJS, Express, JSON en Liquid.

### Empty state

Op de artikel pagina kan je een reactie achterlaten en ik heb een empty state toegevoegd wanneer er geen opmerkingen zijn zodat de gebruiker kan zien dat er nog geen opmerkingen zijn voor het artikel. Ik heb hiervoor in liquid een `{% else %}` statement gebruikt.

[Figma design](https://www.figma.com/design/At4n5rMiNKQKQGzvSkMT4u/Wireflow?node-id=184-204&m=dev)

De reden dat ik dit ontwerp heb gekozen is om de gebruiker duidelijk te laten weten dat er nog geen opmerking is voor het artikel.

<img width="334" height="580" alt="image" src="https://github.com/user-attachments/assets/e0d03152-6ddd-4fd0-a67b-b20bc0b66ca6" />


https://github.com/user-attachments/assets/64f8f289-af6d-4cf5-ab63-8232de825baf

### Loading State & Success State

Op de artikel pagina kan je een reactie achterlaten en het zou fijn zijn als je de status en het process kan zien. Hiervoor heb ik een Loading State & Success State toegevoegd.

[Figma design](https://www.figma.com/design/At4n5rMiNKQKQGzvSkMT4u/Wireflow?node-id=228-153&m=dev)

De reden dat ik dit ontwerp heb gekozen is om de gebruiker duidelijk te laten zien dat de het plaatsen van een comment aan het verwerken is en dat het is verstuurd.

https://github.com/user-attachments/assets/216efb6c-0ef0-439d-a533-733a584531fd

### Progressive Enhancement

Voor de [progressive enhancement](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/a7889db594d4f1d59af92119c2ac4959608d7041/public/style.css#L297-L300) heb ik `@media (prefers-reduced-motion)` gebruikt om animaties uit te zetten.

**Progressive enhancement designs**

[Figma](https://www.figma.com/design/At4n5rMiNKQKQGzvSkMT4u/Wireflow?node-id=175-127&m=dev)

Sommige gebruikers vinden het fijn als de animaties uitgezet worden en daarom heb ik ervoor gekozen dat animaties voor de hover uitgezet worden.

<img width="375" height="335" alt="image" src="https://github.com/user-attachments/assets/98bd60b8-ac54-4da9-851b-0c1bdcdff931" />

https://github.com/user-attachments/assets/f2292d0a-0ddc-44e3-bcaa-db6f8a76695d

---

Ook heb ik Empty state toegevoegd

### Performance responsive images

In deze sprint heb ik gewerkt aan [Responsive Images](https://github.com/WebTins/user-experience-enhanced-website/issues/11) die ervoor zorgen dat de prestatie van de website verbeterd voor gebruikers met oude toestellen die zware afbeeldingen niet aan kunnen.

[Permance Audit](https://github.com/WebTins/user-experience-enhanced-website/issues/19)

## Code conventies

### Ademnruimte

In mijn code maak ik gebruik van ademruimte dat ervoor zorgt dat het lezen van code leesbaar is en te volgen is. Na elke element wordt een witregel gemaakt om het element duidelijk scheidbaar te tonen. En elementen in een elementen worden met 1 tab uitgespreid om te laten zien dat het in het parent element hoort.

[Voorbeeld](https://github.com/WebTins/the-web-is-for-everyone-interactive-functionality/blob/a7889db594d4f1d59af92119c2ac4959608d7041/public/style.css#L7-L38)

### Volgorde HTML en CSS nesting

Bij mijn code conventies hou ik rekening met de vologorde van de HTML structuur die ook in het CSS bestand op volgorde wordt gehouden, hierdoor wordt het lezen van code volgbaar en leesbaar. In mijn CSS bestand nest ik code die in het parent element/class horen. Dit zorgt voor een duidelijke structuur dat het lezen makkelijker maakt.

### Custom properties

Ik maak gebruik van custom-properties zodat ik niet steeds code hoeven te herhalen (DRY). De custom properties krijgen een duidelijke naamgeving in kebabcase zoals `--text-color-1`.

### Class naamgeving

De classes die ik aanmaak worden allemaal in het Engels geschreven met kebab-cases. Dit maakt het lezen makkelijker omdat je een scheiding maakt tussen woorden die niet leesbaar zijn aan elkaar.

## Installatie

Om mijn project te kunnen uitvoeren moet je eerst `npm i(nstall)` uitvoeren en zodra alle node packages zijn geïnstalleerd moet je `npm start` uitvoeren om de localhost te kunnen starten.
