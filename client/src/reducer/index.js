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
        case 'CLEAN_GAMES':
            return{
                ...state,
                 games:{}
            }    
        case 'AZ_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
            }
        case 'ZA_FILTER':
            return {
                ...state,
                games: state.games.sort(function(a, b){
                    if(a.name > b.name) { return -1; }
                    if(a.name < b.name) { return 1; }
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
        default:
            return state;
    }
}

export default rootReducer