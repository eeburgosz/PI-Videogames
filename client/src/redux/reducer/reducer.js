import { ASCENDENTE } from "../../constantes/sort";
import { types } from "../types/actionTypes";

let initialState = {
   allVideogames: [],
   videogames: [],
   gameDetail: [],
   genres: []
}

export const rootReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.GET_VIDEOGAMES:
         return {
            ...state,
            allVideogames: action.payload,
            videogames: action.payload
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
         let orderedVideogames = [...state.allVideogames];
         orderedVideogames.sort((a, b) => {
            if (a.name < b.name) return action.payload === ASCENDENTE ? -1 : 1
            if (b.name < a.name) return action.payload === ASCENDENTE ? 1 : -1
            return 0
         })
         return {
            ...state,
            videogames: orderedVideogames
         }
      case types.RESET_DETAIL:
         return {
            ...state,
            gameDetail: []
         }
      default:
         return state;
   }
}
