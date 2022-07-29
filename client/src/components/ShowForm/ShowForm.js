import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBoxItem from '../SearchBoxItem/SearchBoxItem';
import { ShowContext } from '../../context/show/ShowContext';
import { DateTime } from 'luxon';

const ShowForm = () => {
  const navigateTo = useNavigate();

  // Consume show context
  const { addShow, current, updateShow } = useContext(ShowContext);

  // State for show
  const [show, setShow] = useState({
    id: -1,
    movieName: '',
    posterPath: '',
    showDate: '',
    movieRunTime: '',
    startTime: '',
    endTime: '',
    interval: '',
    service: '',
    screen_no: 1,
    price: null,
    movie: {},
  });

  // Store Movie
  const [movie, setMovie] = useState({});

  // Results from searching tmdb api
  const [result, setResult] = useState([]);
  const onChangeFetch = async (e) => {
    e.preventDefault();
    // setMovieName(e.target.value);
    try {
      // get id
      let res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=734cc84a91971b20856e8ec87c41ca6c&language=en-US&page=1&include_adult=true&query=${e.target.value}`
      );

      setResult(res.data.results);
    } catch (err) {
      setResult([]);
    }
  };

  useEffect(() => {
    if (current !== null) {
      setShow(current);
    } else {
      setShow({
        id: -1,
        movieName: '',
        posterPath: '',
        showDate: '',
        movieRunTime: '',
        startTime: '',
        endTime: '',
        interval: '',
        service: '',
        screen_no: 1,
        price: null,
        movie: {},
      });
    }
  }, [ShowContext, current]);

  // On input change
  const onChangeInput = (e) => {
    let val = e.target.value;

    if (!isNaN(val) && e.target.name !== 'movieName') val = parseInt(val);
    setShow({ ...show, [e.target.name]: val });
  };

  // On selecting a movie card item from suggestions
  const onClickHandler = async (id) => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=734cc84a91971b20856e8ec87c41ca6c&language=en-US`
      );
      const movie = res.data;
      setMovie(movie);
      show.movieName = movie.title;
      show.movieRunTime = movie.runtime;
    } catch (err) {
      setMovie({});
    }
    // setMovie(movie);
    // setShow({ ...show, movie });
    setResult([]);
    console.log(movie);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Calc end time
    const endTime = DateTime.fromFormat(show.startTime, 'HH:mm').plus({
      minutes: show.movieRunTime + show.interval,
    });
    show.endTime = `${endTime.c.hour}:${endTime.c.minute}`;
    if (current === null) {
      addShow(show);
    } else {
      updateShow(show);
      navigateTo('/');
    }
    setShow({});
    setMovie({});
    e.target.reset();
  };

  const onResetHandler = (e) => {
    setShow({});
  };

  return (
    <form
      id="show-form"
      className="w-1/2 mx-auto mt-10 p-7 bg-gray-100 drop-shadow-lg border-2 rounded-2xl"
      onSubmit={onSubmitHandler}
      onReset={onResetHandler}
    >
      {/* Movie name form group */}
      <div className="mb-5 flex flex-col relative">
        <label htmlFor="movieName" className="text-gray-600 font-medium mb-1">
          Enter Movie Name
        </label>
        <input
          type="text"
          name="movieName"
          value={show.movieName}
          onChange={(e) => {
            onChangeFetch(e);
            onChangeInput(e);
          }}
          placeholder="Eg. The Matrix"
          className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
        />
        {/* suggestion drop down */}
        {result.length > 0 && (
          <ul className="absolute top-full z-10 max-h-96 w-full overflow-y-auto bg-gray-200 drop-shadow-md">
            {result.map((movie) => (
              <li key={movie.id} onClick={() => onClickHandler(movie.id)}>
                <SearchBoxItem movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-5 flex justify-between">
        {/* Show Date */}
        <div className="flex flex-col">
          <label htmlFor="showDate" className="text-gray-600 font-medium mb-1">
            Show Date
          </label>
          <input
            type="date"
            name="showDate"
            value={show.showDate}
            onChange={onChangeInput}
            className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          />
        </div>
        {/* Start time  */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-gray-600 font-medium mb-1">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            value={show.startTime}
            onChange={onChangeInput}
            className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          />
        </div>
        {/* End time  */}
        {/* <div>
          <label htmlFor="endTime" className="text-gray-600 font-medium">
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            value={endTime}
            onChange={calcEndTime}
            className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
            disabled
          />
        </div> */}
      </div>
      {/* times  */}
      <div className="mb-5 flex justify-between">
        {/* Interval  */}
        <div>
          <label htmlFor="interval">Interval (in mins)</label>
          <input
            type="number"
            name="interval"
            value={show.interval}
            onChange={onChangeInput}
            max="15"
            step="5"
            className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          />
        </div>
        {/* After Show Service  */}
        <div>
          <label htmlFor="service">Service Time (in mins)</label>
          <input
            type="number"
            name="service"
            value={show.service}
            onChange={onChangeInput}
            min="15"
            step="5"
            className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          />
        </div>
      </div>
      {/* Screen Number  */}
      <div className="mb-5">
        <label htmlFor="screen_no" className="text-gray-600 font-medium">
          Choose Screen no.{' '}
        </label>
        <select
          name="screen_no"
          className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          value={show.screen_no}
          onChange={onChangeInput}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      {/* Price  */}
      <div className="mb-5 flex flex-col">
        <label htmlFor="price" className="text-gray-600 font-medium mb-1">
          Enter ticket price
        </label>
        <input
          type="number"
          name="price"
          value={show.price}
          onChange={onChangeInput}
          placeholder="In ₹ INR "
          className="border-2 rounded-md px-3 py-2 focus:outline-1 focus:outline-coral"
          min="120"
          step="10"
        />
      </div>
      {/* Submit and Reset button  */}
      <div className="mb-5 space-x-2 mt-10 flex justify-center">
        <input type="reset" value="Reset" className="btn bg-black text-white" />
        <input
          type="submit"
          value={current ? 'Update Show' : 'Add Show'}
          className="btn bg-coral text-white"
        />
      </div>
    </form>
  );
};

export default ShowForm;
