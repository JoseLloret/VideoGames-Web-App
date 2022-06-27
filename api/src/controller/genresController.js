const axios = require('axios');
const {Videogame, Genres} = require ('../db');
const API_KEY= '3182f8c6ce8e46559273c22dc8401437'


async function getGenresApi(){
    let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genresData = await genres.data.results.map(e=> e.name)
    genresData = genresData.map(e => e && e.split(", ")).flat()
    return genresData

}

async function getGenresDb(){
    let genresDb = await Genres.findAll({
        include:{
            model: Videogame,
            attributes:['name'],
            through:{
                attributes:[]
            }    
        }
    })
    genresDb = genresDb.map(e=> e.name)
    genresDb = genresDb.map(e => e && e.split(", ")).flat()
    return genresDb
}

async function getAllGenres(){
    const genresApi = await getGenresApi()
    const genresDb = await getGenresDb()
    const allGenres = genresApi.concat(genresDb)
    return allGenres
    
}



module.exports={
    getGenresApi,
    getGenresDb,
    getAllGenres,
}
