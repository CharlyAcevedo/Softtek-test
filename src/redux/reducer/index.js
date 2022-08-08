import {
  GET_ALL_DATA,
  SEARCH_CHARACTER,
  SET_CURRENT_PAGE,
  SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT,
} from "../actions/actionTypes";

import { mapingChars, searchData } from './controlers.js'

const initialState = {
  allData: [],
  dataToShow: [],
  pageToShow: [],
  currentLimit: 5,
  currentPage: 1,
  errors: "",
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DATA:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
    const dataMaped = mapingChars(payload)
    const newPageData = dataMaped.slice(0, state.currentLimit)
    return {
      ...state,
      allData: [...dataMaped],
      dataToShow: [...dataMaped],
      pageToShow: newPageData
    };
    case SEARCH_CHARACTER:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      console.log("este es el payload del reducer", payload)
    const charsFound = searchData(state.allData, payload);
    console.log("esto regresa searchData", charsFound)
    const newPageSearch = charsFound.slice(0, state.currentLimit)
    return {
      ...state,
      dataToShow: [...charsFound],
      pageToShow: newPageSearch
    };
    case SET_CURRENT_PAGE:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      const newPage = state.dataToShow.slice(payload.offset, payload.limit);
      return {
        ...state,
        pageToShow: newPage,
        currentPage: payload.currentPage
      };
    case SET_PAGE_NUMBER:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        currentPage: payload,
      };
      case SET_CURRENT_LIMIT:
        if (payload.error) {
          return {
            ...state,
            errors: payload.error,
          };
        };
        return {
          ...state,
          currentLimit: payload,
        };
    default:
      return state;
  }
};

export default rootReducer;
