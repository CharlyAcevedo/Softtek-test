import {
  GET_ALL_DATA,
  FILTER_BY_SESION,
  ORDER_BY_FIELD,
  SET_CURRENT_PAGE,
  SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT,
} from "../actions/actionTypes";

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
    const newPageData = payload.slice(0, state.currentLimit)
    return {
      ...state,
      allData: [...payload],
      dataToShow: [...payload],
      pageToShow: newPageData
    };
    case FILTER_BY_SESION:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
    return {
      ...state,
    };
    case ORDER_BY_FIELD:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
    return {
      ...state,
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
