import axios from 'axios';
import {
    GET_ALL_DATA,
    SET_CURRENT_PAGE,
    SET_PAGE_NUMBER,
    SET_CURRENT_LIMIT
} from './actionTypes';

export function getAllData(payload) {
    return async (dispatch) => {
      try {
        console.log(payload)
        let response = "";
        if(!payload){
          response = await axios.get("https://rickandmortyapi.com/api/character");
          dispatch({
            type: GET_ALL_DATA,
            payload: response.data.results,
          });
        } else if(Array.isArray(payload) && payload.length > 0){
          response = await axios.get(`https://rickandmortyapi.com/api/character/${payload}`);
          dispatch({
            type: GET_ALL_DATA,
            payload: response.data,
          });
        }
        console.log(response)
      } catch (error) {
        dispatch({
          type: GET_ALL_DATA,
          payload: { error: error.message },
        });
      };
    };
  };
  
export function setCurrentPage(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_PAGE,
        payload: { error: error.message },
      });
    };
  };
};

export function setPageNumber(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_PAGE_NUMBER,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_PAGE_NUMBER,
        payload: { error: error.message },
      });
    };
  };
};

export function setCurrentLimit(payload) {
  return (dispatch) => {
    try {
      dispatch({
        type: SET_CURRENT_LIMIT,
        payload: payload,
      });
    } catch (error) {
      dispatch({
        type: SET_CURRENT_LIMIT,
        payload: { error: error.message },
      });
    };
  };
};
