import express, { response } from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

const baseURL = 'https://fdnd-agency.directus.app/items/'

app.get('/', async function (request, response) {
    const res = await fetch(`${baseURL}frankendael_news`);
    const result = await res.json();
    response.render('index.liquid', {
    news: result.data,
    });
})

app.get('/veldverkenner', async function (request, response) {
   try {
        const res = await fetch(`${baseURL}frankendael_plants`);
        const result = await res.json();
        
        response.render('veldverkenner.liquid', {
            plants: result.data
        });
    } catch (error) {
        response.render('veldverkenner.liquid', { plants: [] });
    }
})

app.get('/nieuws', async function (request, response) {
    const res = await fetch(`${baseURL}frankendael_news`);
    const result = await res.json();

    response.render('nieuws.liquid', {
    news: result.data
    });
})

app.get('/nieuws/:slug', async function (request, response) {
    const res = await fetch(`${baseURL}frankendael_news/?filter[slug]=` + request.params.slug);
    const result = await res.json();
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

app.post('/nieuws/:id/:slug', async (request, response) => {
    const postResponse = await fetch(
        `${baseURL}frankendael_news_comments`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            news: request.params.id,     
            comment: request.body.comment,
            name: request.body.name
        })
      }
    )

    console.log('het gaat goed vgm')
    response.redirect(`/nieuws/${request.params.slug}#reviews`)
})

app.post('/nieuws/:id/:slug/verwijder', async (request, response) => {
    const commentId =  request.body.comment_id
    const slug = request.params.slug

    await fetch(`${baseURL}frankendael_news_comments/${commentId}`, {
        method: 'DELETE'
    });

    response.redirect(303, `/nieuws/${slug}#reviews`)
})

app.use((req, res, next) => {
    res.status(404).render("404.liquid")
})

app.post('/', async function (request, response) {
    response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})