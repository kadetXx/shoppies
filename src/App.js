import React, { useState, useEffect } from "react";
import "./assets/scss/App.scss";
import Header from "./components/header/Header";
import Movie from "./components/movie/Movie";
import Nomination from "./components/nomination/Nomination";

function App() {
  const [mobileSidebar, toggleMobileSidebar] = useState(false);
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedNominations = localStorage.getItem("shoppiesNominations");

    storedNominations !== null
      ? setNominations(JSON.parse(storedNominations))
      : localStorage.setItem(
          "shoppiesNominations",
          JSON.stringify(nominations)
        );

    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.value === "") {
      fetch(`http://www.omdbapi.com/?s=${searchTerm}&page=1-10&apikey=4019cc8`)
        .then((res) => res.json())
        .then((data) => setMovies(data.Search));
    }
  };

  const nominateMovie = (movie) => {
    const newMoviesArray = [...nominations, movie];
    setNominations(newMoviesArray);

    // add movie to loaclstorage
    localStorage.setItem("shoppiesNominations", JSON.stringify(newMoviesArray));
  };

  const undoNomination = (movie) => {
    const currentNominations = nominations.filter(
      (item) => item.imdbID !== movie.imdbID
    );

    setNominations(currentNominations);
    localStorage.setItem(
      "shoppiesNominations",
      JSON.stringify(currentNominations)
    );
  };

  return (
    <div className='App'>
      <Header
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
      />
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
                  Showing <span>{movies.length}</span> results for keyword{" "}
                  <span>'{searchTerm}'</span>
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
    </div>
  );
}

export default App;
