import React, { useState, useEffect, useRef } from "react";
import "./assets/scss/App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Movie from "./components/movie/Movie";
import Nomination from "./components/nomination/Nomination";

function App() {
  const [mobileSidebar, toggleMobileSidebar] = useState(false);
  const [movies, setMovies] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const top = useRef();

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

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      console.log(searchTerm.length);
      fetch(
        `http://www.omdbapi.com/?s=${e.target.value}&page=1-10&apikey=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setMovies(data.Search || []));
    } else {
      setMovies([]);
    }
  };

  const nominateMovie = (movie) => {
    const newMoviesArray = [movie, ...nominations];
    setNominations(newMoviesArray);

    // add movie to loacalstorage
    localStorage.setItem("shoppiesNominations", JSON.stringify(newMoviesArray));

    nominations.length === 4 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
    <div className='App' id={mobileSidebar ? "no-scroll" : ""}>
      <Header
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
      />
      <main ref={top}>
        <section className='movies'>
          <div className='movies__section movies__section--listings'>
            {nominations.length === 5 && (
              <div className='banner'>
                <p>
                  You've nominated five movies for the shoppies awards! You
                  rock!{" "}
                </p>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                <i className='fa fa-search'></i>
                <input
                  autoComplete='off'
                  type='text'
                  name='search'
                  placeholder='Search movies'
                  value={searchTerm}
                  onChange={handleSearch}
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
            <h3 className='movies__section--nominations__title'>
              Your Nominations
            </h3>

            {nominations.length === 0 && (
              <div className='movies__section--nominations__empty'>
                <i class='fas fa-ghost'></i>
                <p>Empty!</p>
              </div>
            )}

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

        <Footer />
      </main>
    </div>
  );
}

export default App;
