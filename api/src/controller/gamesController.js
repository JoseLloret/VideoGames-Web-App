const axios = require('axios');
const {Videogame, Genres, Platforms} = require ('../db');
const API_KEY= '3182f8c6ce8e46559273c22dc8401437'

async function getGamesApiId(){
    let games = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    let gamesData = await games.data.results.map(e=>{
        return{
            id: e.id,
            name: e.name,
            description: e.description,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e=>e.platform.name).join(", "),
            genres: e.genres.map(e=>e.name).join(", ") 
        }
    })
    return gamesData
}
async function getGamesApi(){
    let page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    let page2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    let page3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    let page4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    let page5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    page1 = page1.data.results
    page2 = page2.data.results
    page3 = page3.data.results
    page4 = page4.data.results
    page5 = page5.data.results
    let games = page1.concat(page2).concat(page3).concat(page4).concat(page5)
    //let games = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`)
    let gamesData = await games.map(e=>{
        return{
            id: e.id,
            name: e.name,
            description: e.description,
            released: e.released,
            rating: e.rating,
            image: e.background_image,
            platforms: e.platforms.map(e=>e.platform.name).join(", "),
            genres: e.genres.map(e=>e.name).join(", ") 
        }
    })
    return gamesData
}

async function getGamesDb(){
    let gamesDb = await Videogame.findAll({
        include:[
            {model: Genres, attributes:['name'], through:{attributes:[]}},
            {model: Platforms, attributes:['name'], through:{attributes:[]}}
        ]
        
    })
    gamesDb = gamesDb.map(e=>{
        return {
            id: e.id,
            description: e.description,
            name: e.name,
            released: e.released,
            rating: e.rating,
            image: e.image,
            platforms: e.platforms.map(e=>e.name).join(", "),
            genres: e.genres.map(e=>e.name).join(", ") 
        }
    })
    return gamesDb
}

async function getAllGames(){
    const gamesApi = await getGamesApi()
    const gamesDb = await getGamesDb()
    const allGames = gamesApi.concat(gamesDb)
    return allGames
}
async function getAllGames2(){
    const gamesApi = await getGamesApiId()
    const gamesDb = await getGamesDb()
    const allGames = gamesApi.concat(gamesDb)
    return allGames
}




module.exports={
    getGamesApi,
    getGamesDb,
    getAllGames,
    getGamesApiId,
    getAllGames2,
}