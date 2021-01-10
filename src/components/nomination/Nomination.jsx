import React from "react";
import "./Nomination.scss";

function Nomination({ movieData, undoNomination }) {
  return (
    <article className='movie nomination'>
      <div className='movie__image'>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div className='movie__details'>
        <h4 className='movie__details__title'> {movieData.Title} </h4>
        <p className='movie__details__release-year'>
          <span>Released:</span> <i>{movieData.Year} </i>
        </p>
      </div>
      <button
          className='nominate-button'
          onClick={() => undoNomination(movieData)}
        >
          Remove <i class="fas fa-minus"></i>
        </button>
    </article>
  );
}

export default Nomination;
