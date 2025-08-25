import React, {useEffect, useState} from 'react'
import {useDebounce} from "react-use";
import Header from "./components/Header.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import AllMovies from "./components/AllMovies.jsx";
import {fetchMovies, loadTrendingMovies} from "./api/movies.js";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [moviesErrorMessage, setMoviesErrorMessage] = useState('');

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false);
    const [trendingMoviesErrorMessage, setTrendingMoviesErrorMessage] = useState('');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

    useEffect(() => {
        fetchMovies(debouncedSearchTerm, setMoviesLoading, setMoviesErrorMessage, setMovieList).then(r => r);
    }, [debouncedSearchTerm])

    useEffect(() => {
        loadTrendingMovies(setTrendingMoviesLoading, setTrendingMovies, setTrendingMoviesErrorMessage);
    }, [])

    return (
        <main>
            <div className="pattern" ></div>

            <div className="wrapper">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <TrendingMovies
                    movies={trendingMovies}
                    moviesLoading={trendingMoviesLoading}
                    errorMessage={trendingMoviesErrorMessage}
                />

                <AllMovies
                    movies={movieList}
                    loading={moviesLoading}
                    errorMessage={moviesErrorMessage}
                />
            </div>
        </main>
    )
}
export default App
