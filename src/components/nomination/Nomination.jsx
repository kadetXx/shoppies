import React from "react";
import "./Nomination.scss";

function Nomination({ movieData, undoNomination }) {
  return (
    <article className='movie-card nomination-card'>
      <div className='movie__image'>
        <img
          src={
            movieData.Poster === "N/A"
              ? `https://via.placeholder.com/300x424?text=${movieData.Title}`
              : movieData.Poster
          }
          alt={`Poster for ${movieData.Title}`}
        />
      </div>
      <div className='movie-card__details'>
        <h4 className='movie-card__details__title'> {movieData.Title} </h4>
        <p className='movie-card__details__release-year'>
          <span>Released:</span> <em>{movieData.Year} </em>
        </p>
      </div>
      <button
        className='nominate-button'
        aria-label='Remove Nomination'
        onClick={() => undoNomination(movieData)}
      >
        Remove
      </button>
    </article>
  );
}

export default Nomination;
