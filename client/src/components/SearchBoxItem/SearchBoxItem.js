import React from 'react';

const SearchBoxItem = ({ movie }) => {
  return (
    <div className="w-100 flex hover:cursor-pointer h-40 my-2 py-2 bg-slate-50 rounded-md hover:bg-slate-200">
      {/* Image  */}
      <div className="">
        <img
          className="object-cover h-full"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      </div>
      <div className="flex-1 pl-2">
        <h3 className="text-2xl">{movie.title}</h3>
        <h6 className="text-sm">Language: {movie.original_language}</h6>
        <h6 className="text-sm">Rating: {movie.vote_average}</h6>
        {movie.adult === true && <h6 className="text-sm">+18 Adult Content</h6>}
        <h6 className="text-sm"> Release Date: {movie.release_date}</h6>
      </div>
    </div>
  );
};

export default SearchBoxItem;
