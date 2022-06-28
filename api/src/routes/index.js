const { Router } = require('express');
const axios = require('axios');
const {Videogame, Genres, Platforms} = require ('../db');
const express = require('express');
const API_KEY= '3182f8c6ce8e46559273c22dc8401437'

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {getAllGames, } = require('../controller/gamesController');
const {getAllGenres} = require('../controller/genresController');
const {getPlatforms} = require('../controller/platformController');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async(req, res)=>{
    const name = req.query.name;
    let allGames = await getAllGames();

    if(name){
        let gameName = await allGames.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()))
        gameName.length > 0 ? res.status(200).send(gameName) : res.status(404).send('El VideoGame no existe')
    } else {
        res.status(200).send(allGames)
    }
})

router.get('/videogame/:idVideogame', async (req, res)=>{
    const id = req.params.idVideogame
    const allGames = await getAllGames();
    if(id){
        const gameId = await allGames.filter(e => e.id == id)
        gameId.length ? res.status(200).json(gameId) : res.status(404).send('El ID no existe')
    }
})

router.get('/genres', async (req, res)=>{
    const allGenres = await getAllGenres();
    await allGenres.forEach(e => Genres.findOrCreate({where: {name: e}}))
    const allGenresFromApi = await Genres.findAll()
    allGenresFromApi.length ? res.status(200).send(allGenresFromApi) : res.status(404).send('No hay generos')
})

router.get('/platforms', async (req, res)=>{
    let allPlatforms = await getPlatforms();
    await allPlatforms.forEach(e => Platforms.findOrCreate({where: {name: e}}))
    const allPlatformsFromApi = await Platforms.findAll()
    res.send(allPlatformsFromApi)
})
// router.get('/plataform', async (req, res)=>{
//     const page1 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=1`)
//     const page2 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)
//     const plataform = page1.data.results.concat(page2.data.results)
//     const allPlatforms = plataform.map(e => e.name.split(", ")).flat()
//     const allPlatformsFromApi = await Genres.findAll()
//     await allPlatforms.forEach(e => Platforms.findOrCreate({where: {name: e}}))
//     res.send(allPlatformsFromApi)
// })

router.post('/videogames', async (req, res, next)=>{
    const {name, description, rating, released, genres, platforms, image } = req.body
    if(!name || !description || !rating || !released) return res.status(404).send('Faltan datos obligatorios')
    // if(Number(rating) < 0 || Number(rating) > 5) return res.status(404).send('Ingrese valores entre 0 y 5')
    try{
        const game = {name, description, rating, released, image }
        const gameCreate = await Videogame.create(game)
        const genresCreate = await Genres.findAll({
            where: {name : genres}
        })
        const platformsCreate = await Platforms.findAll({
            where: {name : platforms}
        })
    gameCreate.addGenres(genresCreate)
    gameCreate.addPlatforms(platformsCreate)
    res.status(201).send('VideoGame creado!!')
    } catch(error){
        next(error)
    }
})

router.delete('/delete/:idVideogame', async (req, res, next)=>{
    const id = req.params.idVideogame
    if(!id) return res.status(404).send('Faltan datos obligatorios')
    if(typeof(id) !== 'string') return res.status(404).send('Solo pueden eliminarse video games de base de datos')
    try{
        const games = await Videogame.destroy({
            where: {id: id}
        })
        res.send('VideoGame eliminado')
    } catch(error){
        next(error)
    }
})


module.exports = router;
