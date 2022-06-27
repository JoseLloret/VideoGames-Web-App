import axios from 'axios';
//conexion entre el Front y el Back

export function getGames(){
    return async function(dispatch){
        const json = await axios.get("http://localhost:3001/videogames",{

        })
        return dispatch({
            type: 'GET_GAMES',
            payload: json.data
        })
    }
}
export function getPlatforms(){
    return async function(dispatch){
        const plat = await axios.get("http://localhost:3001/platforms",{
        })
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: plat.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        const genres = await axios.get("http://localhost:3001/genres",{

        })
        return dispatch({
            type: 'GET_GENRES',
            payload: genres.data
        })
    }
}

export function getNameGame(name){
    return async function(dispatch){
        try{
            const names = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: 'GET_NAME_GAME',
                payload: names.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

export function getDetails(id){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
export function Clean(){
    return async function(dispatch){
        return dispatch({
            type: 'CLEAN'
        })
    }
}
export function CleanGames(){
    return async function(dispatch){
        return dispatch({
            type: 'CLEAN_GAMES'
        })
    }
}

export function postGame(payload){
    return async function(dispatch){
        const post = await axios.post("http://localhost:3001/videogames", payload)
        console.log(post)
        return post
    }
}

// FILTROS DE ORDEN
export function filtroAsc(){
    return {
        type: 'AZ_FILTER',
    }
}

export function filtroDesc(){
    return {
        type: 'ZA_FILTER',
    }
}

export function filtroMax(){
    return {
        type: 'MAX_FILTER',
    }
}

export function filtroMin(){
    return {
        type: 'MIN_FILTER',
    }
}

export function filtroGenre(payload){
    return{
        type: 'FILTER_GENRE',
        payload
    }
}