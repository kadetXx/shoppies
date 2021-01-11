import React, { useState, useEffect } from "react";
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
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const storedNominations = localStorage.getItem("shoppiesNominations");

    // fetch nominations from local storage
    storedNominations !== null
      ? setNominations(JSON.parse(storedNominations))
      : localStorage.setItem(
          "shoppiesNominations",
          JSON.stringify(nominations)
        );

    // fetch limit from local storage
    const storedLimit = localStorage.getItem("nominationLimit");

    storedLimit === null
      ? localStorage.setItem("nominationLimit", 5)
      : setLimit(Number(storedLimit));

    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      fetch(
        `https://www.omdbapi.com/?s=${e.target.value}&page=1-10&apikey=${process.env.REACT_APP_API_KEY}`
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

    // update limit
    setLimit(limit - 1);

    // update local storage limit
    localStorage.setItem("nominationLimit", limit - 1);

    nominations.length === 5 &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  const undoNomination = (movie) => {
    const currentNominations = nominations.filter(
      (item) => item.imdbID !== movie.imdbID
    );

    // update local storage
    setNominations(currentNominations);
    localStorage.setItem(
      "shoppiesNominations",
      JSON.stringify(currentNominations)
    );

    // update limit
    setLimit(limit + 1);

    // update local storage limit
    localStorage.setItem("nominationLimit", limit + 1);
  };

  return (
    <div className='App' id={mobileSidebar ? "no-scroll" : ""}>
      <Header
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
        limit={limit}
      />
      <div className='main-wrapper'>
        <div className='main-wrapper__inner'>
          <main>
            {nominations.length === 5 && (
              <div className='banner' role='banner'>
                <i className='fas fa-exclamation-circle'></i>
                <p>
                  You've used up your nominations, Thanks!
                </p>
              </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                <i className='fa fa-search'></i>
                <input
                  aria-label='Search movies'
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

            <div className='movies__listing'>
              {movies.map((movie) => (
                <Movie
                  key={movie.imdbID}
                  movieData={movie}
                  nominateMovie={nominateMovie}
                  nominations={nominations}
                  limit={limit}
                />
              ))}
            </div>
          </main>

          <aside
            className={`nominations ${
              mobileSidebar ? "show-sidebar" : "hide-sidebar"
            }`}
          >
            <h3 className='nominations__heading'>Your Nominations</h3>
            <p className='nominations__limit'>
              You have <strong>{limit} Nominations</strong> Remaining
            </p>

            {nominations.length === 0 && (
              <div className='nominations__empty'>
                <i className='fas fa-ghost'></i>
                <p>Empty!</p>
              </div>
            )}

            <div className='nominations__listing'>
              {nominations.map((movie) => (
                <Nomination
                  key={movie.imdbID}
                  movieData={movie}
                  undoNomination={undoNomination}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
