import { ALL, ASCENDENTE, DB, MIN } from "../../helpers/constantes";
import { types } from "../types/actionTypes";

let initialState = {
   allVideogames: [],
   videogames: [],
   gameDetail: [],
   genres: [],
   platforms: []
}

export const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.GET_VIDEOGAMES:
         let platformsApi = []
         let plat = []
         for (let i = 0; i < action.payload.length; i++) {
            if (action.payload[i].hasOwnProperty('platforms')) {
               platformsApi.push(action.payload[i].platforms)
            }
         }
         for (let i = 0; i < platformsApi.length; i++) {
            for (let j = 0; j < platformsApi[i].length; j++) {
               plat.push(platformsApi[i][j])
            }
         }
         let allPlatforms = [];
         plat.forEach((elemento) => {
            if (!allPlatforms.includes(elemento)) {
               allPlatforms.push(elemento);
            }
         });
         return {
            ...state,
            allVideogames: action.payload,
            videogames: action.payload,
            platforms: allPlatforms
         }
      case types.GET_GAME_BY_NAME:
         return {
            ...state,
            videogames: action.payload
         }
      case types.GET_GAME_DETAIL:
         return {
            ...state,
            gameDetail: action.payload
         }
      case types.CREATE_GAME:
         return {
            ...state
         }
      case types.GET_GENRES:
         return {
            ...state,
            genres: action.payload
         }
      //!------------------------------------------------------------------------------         
      case types.SORT:
         let orderedVideogames = [...state.videogames];
         orderedVideogames.sort((a, b) => {
            if (a.name < b.name) return action.payload === ASCENDENTE ? -1 : 1
            if (b.name < a.name) return action.payload === ASCENDENTE ? 1 : -1
            return 0
         })
         return {
            ...state,
            videogames: orderedVideogames
         }
      case types.FILTERED_RATING:
         const orderByRating =
            action.payload === MIN
               ? state.videogames.sort((a, b) => {
                  if (a.rating > b.rating) return 1;
                  if (b.rating > a.rating) return -1;
                  return 0;
               })
               : state.videogames.sort((a, b) => {
                  if (a.rating > b.rating) return -1;
                  if (b.rating > a.rating) return 1;
                  return 0;
               });
         return {
            ...state,
            videogames: orderByRating,
         };
      case types.RESET_DETAIL:
         return {
            ...state,
            gameDetail: []
         }
      case types.FILTERED_GENRES:
         let gamesGenres = state.allVideogames.filter(e => e.genres.includes(action.payload));
         return {
            ...state,
            videogames: action.payload === ALL ? state.allVideogames : gamesGenres
         }
      case types.FILTER_API_DB:
         let gamesApiAndDb = state.allVideogames
         let gamesFiltered = action.payload === DB ? gamesApiAndDb.filter(e => e.dbCreated) : gamesApiAndDb.filter(e => !e.dbCreated)
         console.log(gamesFiltered)
         return {
            ...state,
            videogames: action.payload === ALL ? gamesApiAndDb : gamesFiltered
         }
      default:
         return state;
   }
}
