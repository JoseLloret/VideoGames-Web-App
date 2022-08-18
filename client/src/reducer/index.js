const initialState = {
    games : [],
    allGames : [],
    genres: [],
    detail: [],
    platforms:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'POST_GAME':
            return{
                ...state,
            }
        case 'GET_GAMES':
            return{
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        case 'GET_GENRES':
            return{
             ...state,
             genres: action.payload
            }
        case 'GET_NAME_GAME':
            return{
                ...state,
                games: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms: action.payload
            }
        case 'CLEAN':
            return{
                ...state,
                detail:{}
            }
        case 'GET_DELETE':
            return{
                ...state,
            }
        case 'CLEAN_GAMES':
            return{
                ...state,
                 games:{}
            }    
        case 'AZ_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
                    return 0;
                })
            }
        case 'ZA_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) { return -1; }
                    if(a.name.toLowerCase() < b.name.toLowerCase()) { return 1; }
                    return 0;
                })
            }
        case 'MIN_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.rating < b.rating) { return -1; }
                    if(a.rating > b.rating) { return 1; }
                    return 0;
                })
            }
        case 'MAX_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.rating > b.rating) { return -1; }
                    if(a.rating < b.rating) { return 1; }
                    return 0;
                })
            }
        case 'FILTER_GENRE':
            const allGames = state.allGames
            const statusFiltered = action.payload === 'all' ? allGames : allGames.filter(e =>e.genres?.includes(action.payload))
            return{
                ...state,
                games: statusFiltered
            }
        case 'FROM_DB':
            const games = state.allGames
            const gamesFiltered =games.filter(e =>e.id.length > 34)
            return{
                ...state,
                games: gamesFiltered
            }
        case 'FROM_API':
            const gamesApi = state.allGames
            const gamesApiFiltered =gamesApi.filter(e =>e.id.length < 34)
            return{
                ...state,
                games: gamesApiFiltered
        }
        case 'FILTER_FROM':
            const gamesFrom = state.allGames           
            const   api = action.payload === 'api',
                    db = action.payload === 'db' , 
                    gamesFromFiltered = api ? gamesFrom.filter(e =>typeof(e.id) === 'number') : db ? gamesFrom.filter(e =>typeof(e.id) === 'string') : gamesFrom
            return{
                ...state,
                games: gamesFromFiltered
            }
        case 'FILTRO_NUEVO':
            console.log("Hola 3")
            const gamesRating = state.allGames
            const gamesRatingFiltered = gamesRating.filter(e => e.rating == 3)
            console.log(gamesRatingFiltered)
            return{
                ...state,
                games: gamesRatingFiltered,
            }
        default:
            return state;
    }
}

export default rootReducer