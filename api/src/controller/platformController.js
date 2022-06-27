const axios = require('axios');
const {Videogame, Genres, Platforms} = require ('../db');
const API_KEY= '3182f8c6ce8e46559273c22dc8401437'

async function getPlatforms(){
    let page1 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=1`)
    let page2 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)
    page1 = page1.data.results
    page2 = page2.data.results
    let plataform = page1.concat(page2)
    let allPlatforms = plataform.map(e => e.name.split(", ")).flat()
    return allPlatforms
}

module.exports={
    getPlatforms
}