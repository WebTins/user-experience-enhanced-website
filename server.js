// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express, { response } from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({extended: true}))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')

const baseURL = 'https://fdnd-agency.directus.app/items/'

// Maak een GET route voor de index (meestal doe je dit in de root, als /)
app.get('/', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   response.render('index.liquid')
})

// !!!! ROUTE NAAR VELDVERKENNER !!!!  /)
app.get('/veldverkenner', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   try {
        const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_plants');
        const result = await res.json();
        
        response.render('veldverkenner.liquid', {
            plants: result.data
        });
    } catch (error) {
        response.render('veldverkenner.liquid', { plants: [] });
    }
})

// !!!! ROUTE NAAR HET NIEUWS !!!!  /)
app.get('/nieuws', async function (request, response) {
   // Render index.liquid uit de Views map
   // Geef hier eventueel data aan mee
   const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news');
    const result = await res.json();

    response.render('nieuws.liquid', {
      news: result.data
    });
})

// !!! Met deze GET krijg je het hele artikel te zien vanuit de database wanneer je op de nieuwspagina op een artikel klikt !!!
app.get('/nieuws/:slug', async function (request, response) {
    // const artikel = tempDummyNews.data.find(item => item.slug === nieuwSlug)
    // deze code hieronder haalt data uit database op
    const res = await fetch('https://fdnd-agency.directus.app/items/frankendael_news/?filter[slug]=' + request.params.slug);
    const result = await res.json();
// console.log(result.data[0].id)
    const commentParams = new URLSearchParams({
      'filter[news]': result.data[0].id,
      'sort' : '-date_created'  
    })

    const commentResponse = await fetch(`${baseURL}frankendael_news_comments?${commentParams}`)
    const commentResponseJSON = await commentResponse.json()
    response.render('artikel.liquid', {
      news: result.data,
      newsId: result.data.id,
      comments: commentResponseJSON.data
    });
  })

// <form action="/nieuws/{{ news.id }}/{{ news.slug }}" method="POST"> vanuit formulier op de nieuwspagina wordt deze post route aangestuurd
app.post('/nieuws/:id/:slug', async (request, response) => {
  
    const postResponse = await fetch(
      'https://fdnd-agency.directus.app/items/frankendael_news_comments', // API endpoint van de nieuws comments (hier kan je een GET en POST doen)
      {
        // dit is JSON object met de benodigde data om wat op te slaan
        method: 'POST', // methode post meegeven zodat de server weet dat er data opgeslagen moet worden
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          news: request.params.id,     
          comment: request.body.comment,
          name: request.body.name // dit is wat er in het formulierelement staat <textarea name="comment" required maxlength="100" style="height: 30px;"></textarea>
        })
      }
    )

    // const data = await postResponse.json()

    console.log('het gaat goed vgm')
    response.redirect(`/nieuws/${request.params.slug}#reviews`) // als de post gelukt is eeen redirect naar de get route VAN HET NIEUWS ARTIKEL
})

app.post('/nieuws/:id/:slug/verwijder', async (request, response) => {
  const commentId =  request.body.comment_id
  const slug = request.params.slug

  await fetch(`${baseURL}frankendael_news_comments/${commentId}`, {
      method: 'DELETE'
    });

  response.redirect(303, `/nieuws/${slug}#reviews`) // als de post gelukt is eeen redirect naar de get route VAN HET NIEUWS ARTIKEL
})

app.use((req, res, next) => {
      res.status(404).render("404.liquid")
})

/*
// Zie https://expressjs.com/en/5x/api.html#app.get.method over app.get()
app.get(…, async function (request, response) {
  
  // Zie https://expressjs.com/en/5x/api.html#res.render over response.render()
  response.render(…)
})
*/

/*
// Zie https://expressjs.com/en/5x/api.html#app.post.method over app.post()
app.post(…, async function (request, response) {

  // In request.body zitten alle formuliervelden die een `name` attribuut hebben in je HTML
  console.log(request.body)

  // Via een fetch() naar Directus vullen we nieuwe gegevens in

  // Zie https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch over fetch()
  // Zie https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify over JSON.stringify()
  // Zie https://docs.directus.io/reference/items.html#create-an-item over het toevoegen van gegevens in Directus
  // Zie https://docs.directus.io/reference/items.html#update-an-item over het veranderen van gegevens in Directus
  const fetchResponse = await fetch(…, {
    method: …,
    body: JSON.stringify(…),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })

  // Als de POST niet gelukt is, kun je de response loggen. Sowieso een goede debugging strategie.
  // console.log(fetchResponse)

  // Eventueel kun je de JSON van die response nog debuggen
  // const fetchResponseJSON = await fetchResponse.json()
  // console.log(fetchResponseJSON)

  // Redirect de gebruiker daarna naar een logische volgende stap
  // Zie https://expressjs.com/en/5x/api.html#res.redirect over response.redirect()
  response.redirect(303, …)
})
*/

// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
