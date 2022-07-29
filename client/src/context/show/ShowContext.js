import React, { createContext, useReducer } from 'react';
import ShowReducer from './ShowReducer';
import {
  ADD_SHOW,
  UPDATE_SHOW,
  DELETE_SHOW,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types';

export const ShowContext = createContext();

const ShowState = (props) => {
  const initialState = {
    shows: [
      {
        id: 1,
        movieName: 'Jujutsu Kaisen 0',
        posterPath: '/3pTwMUEavTzVOh6yLN0aEwR7uSy.jpg',
        showDate: '2022-07-08',
        startTime: '19:35',
        interval: 10,
        service: 30,
        endTime: '21:50',
        screen_no: 1,
        price: 300,
        movie: {},
      },
      {
        id: 2,
        movieName: 'Spider-Man: No Way Home',
        posterPath: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
        showDate: '2022-07-08',
        startTime: '19:35',
        interval: 10,
        service: 40,
        endTime: '21:50',
        screen_no: 2,
        price: 200,
        movie: {},
      },
      {
        id: 3,
        movieName: 'Minions: The Rise of Gru',
        posterPath: '/AfYGGvHufd8cIosTvBtnzUExxe4.jpg',
        showDate: '2022-07-09',
        startTime: '15:00',
        interval: 10,
        service: 30,
        endTime: '18:00',
        screen_no: 4,
        price: 120,
        movie: {},
      },
    ],
    current: null,
  };
  const [state, dispatch] = useReducer(ShowReducer, initialState);

  // Add Show
  const addShow = (show) => {
    show.id = 9999;
    dispatch({ type: ADD_SHOW, payload: show });
  };

  // Set Current
  const setCurrent = (show) => {
    dispatch({ type: SET_CURRENT, payload: show });
  };

  // Update Show
  const updateShow = (show) => {
    dispatch({ type: UPDATE_SHOW, payload: show });
    clearCurrent();
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Delete Show
  const deleteShow = (id) => {
    dispatch({ type: DELETE_SHOW, payload: id });
  };

  return (
    <ShowContext.Provider
      value={{
        shows: state.shows,
        current: state.current,
        addShow,
        updateShow,
        setCurrent,
        clearCurrent,
        deleteShow,
      }}
    >
      {props.children}
    </ShowContext.Provider>
  );
};

export default ShowState;
