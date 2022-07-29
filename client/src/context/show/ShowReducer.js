import React from 'react';
import {
  ADD_SHOW,
  CLEAR_CURRENT,
  DELETE_SHOW,
  SET_CURRENT,
  UPDATE_SHOW,
} from '../types';

const ShowReducer = (state, action) => {
  switch (action.type) {
    case ADD_SHOW:
      // console.log(state.shows);
      return {
        ...state,
        shows: [...state.shows, action.payload],
      };

    case UPDATE_SHOW:
      return {
        ...state,
        shows: state.shows.map((show) =>
          show.id === action.payload.id ? action.payload : show
        ),
      };

    case DELETE_SHOW:
      return {
        ...state,
        shows: state.shows.filter((show) => show.id !== action.payload),
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};

export default ShowReducer;
