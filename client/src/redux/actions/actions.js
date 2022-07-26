import axios from 'axios';
import { types } from '../types/actionTypes';

export const getAllVideogames = () => {
   return async function (dispatch) {
      try {
         let info = await axios.get("http://localhost:3001/api/videogames");
         return dispatch({
            type: types.GET_VIDEOGAMES,
            payload: info.data
         });
      } catch (error) {
         alert('Error al obtener los videojuegos')
      }
   }
};

export const getGameByName = (search) => {
   return async (dispatch) => {
      try {
         let info = await axios.get(`http://localhost:3001/api/videogames?name=${search}`);
         //console.log(info.data)
         return dispatch({
            type: types.GET_GAME_BY_NAME,
            payload: info.data
         })
      } catch (error) {
         alert('Juego no encontrado')
      }
   }
};

export const getGameDetail = (id) => {
   console.log(id)
   return async (dispatch) => {
      try {
         let info = await axios.get(`http://localhost:3001/api/videogame/${id}`);
         console.log(info.data)
         return dispatch({
            type: types.GET_GAME_DETAIL,
            payload: info.data
         })
      } catch (error) {
         alert('Error al obtener los detalles')
      }
   }
};

export const createGame = (payload) => {
   return async (dispatch) => {
      try {
         let info = await axios.post('http://localhost:3001/api/videogames', payload);
         return dispatch({
            type: types.CREATE_GAME,
            info
         })
      } catch (error) {
         alert('Error en la creación del juego')
      }
   }
};

export const getGenres = () => {
   return async (dispatch) => {
      try {
         let info = await axios.get('http://localhost:3001/api/genres');
         return dispatch({
            type: types.GET_GENRES,
            payload: info.data
         })
      } catch (error) {
         alert('Error al obtener los géneros')
      }
   }
};

//!-------------------------------------------------------------------------

export const sort = (order) => {
   return {
      type: types.SORT,
      payload: order
   }
};

export const resetDetail = () => {
   return {
      type: types.RESET_DETAIL
   }
};

export const filteredGenres = (payload) => {
   return {
      type: types.FILTERED_GENRES,
      payload
   }
}