import React, { useState } from "react";
import "./Home.scss";

import Movie from "../movie/Movie";
import Nomination from "../nomination/Nomination"

function Home({ mobileSidebar }) {
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://www.omdbapi.com/?s=${searchTerm}&page=1-10&apikey=4019cc8`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  };

  const nominateMovie = (movie) => {
    setNominations([...nominations, movie]);
  };

  const undoNomination = (movie) => {
    const currentNominations = nominations.filter(item => item.imdbID !== movie.imdbID);
    setNominations(currentNominations);
  }

  return (
    <main>
      <section className='movies'>
        <div className='movies__section movies__section--listings'>
          <form onSubmit={handleSubmit}>
            <label>
              <i className='fa fa-search'></i>
              <input
                autoComplete='off'
                type='text'
                name='search'
                placeholder='Search movies'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </form>

          {movies.length > 0 && (
            <div className='stats'>
              <p>
                Showing <span>{movies.length}</span> results for keyword <span>'{searchTerm}'</span>
              </p>
            </div>
          )}

          <div className='movies__section__listing'>
            {movies.map((movie) => (
              <Movie
                key={movie.imdbID}
                movieData={movie}
                nominateMovie={nominateMovie}
                nominations={nominations}
              />
            ))}
          </div>
        </div>

        <div
          className={`movies__section movies__section--nominations ${
            mobileSidebar
              ? "movies__section--nominations--show"
              : "movies__section--nominations--hide"
          }`}
        >
          <h3>Nominations</h3>

          <div className='movies__section__listing'>
            {nominations.map((movie) => (
              <Nomination
                key={movie.imdbID}
                movieData={movie}
                undoNomination={undoNomination}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

// Poster: "https://m.media-amazon.com/images/M/MV5BZDRmNjYwZDktOTYxZi00MTdlLWI5ZjYtYWU4MDE5MDc5NGM3L2ltYWdlXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SX300.jpg"
// Title: "Bat*21"
// Type: "movie"
// Year: "1988"
// imdbID: "tt0094712"
