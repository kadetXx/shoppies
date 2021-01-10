import React from "react";
import "./Movie.scss";

function Movie({ movieData, nominateMovie, nominations }) {
  const checkNominationStatus = () => {
    const isNominated = nominations.filter(
      (movie) => movie.imdbID === movieData.imdbID
    );

    return isNominated.length > 0;
  };

  const getButtonClass = () => {
    const check = checkNominationStatus();

    if (check) {
      return "nominate-button disabled";
    } else {
      return "nominate-button";
    }
  };

  return (
    <article className='movie'>
      <div className='movie__image'>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div className='movie__details'>
        <h4 className='movie__details__title'> {movieData.Title} </h4>
        <p className='movie__details__release-year'>
          <span>Released:</span> <i>{movieData.Year} </i>
        </p>
        <button
          className={getButtonClass()}
          onClick={() => nominateMovie(movieData)}
        >
          {checkNominationStatus() ? (
            <React.Fragment>
              Nominated <i class='far fa-check-circle'></i>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Nominate 
            </React.Fragment>
          )}
        </button>
      </div>
    </article>
  );
}

export default Movie;
