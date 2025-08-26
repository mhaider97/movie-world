import React, {useCallback, useEffect, useState} from 'react'
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";
import {fetchMovies} from "../api/movies.js";

const AllMovies = ({debouncedSearchTerm}) => {
    const [movieList, setMovieList] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [moviesErrorMessage, setMoviesErrorMessage] = useState('');
    const [page, setPage] = useState(1);

    const loadPage = useCallback(async (pageToLoad) => {
        await fetchMovies(
            debouncedSearchTerm,
            pageToLoad,
            setMoviesLoading,
            setMoviesErrorMessage,
            setMovieList
        );
        setPage(prev => (prev === pageToLoad ? pageToLoad + 1 : prev));
    }, [debouncedSearchTerm]);

    useEffect(() => {
        setMovieList([]);
        setPage(1);
        loadPage(1).then(r => console.log(r));
    }, [debouncedSearchTerm, loadPage]);

    if (moviesErrorMessage) {
        return (
            <section className="all-movies">
                <h2>All Movies</h2>
                <p className="text-red-500">{moviesErrorMessage}</p>
            </section>
        );
    }

    return (
        <section className="all-movies">
            <h2>All Movies</h2>

            {moviesLoading && movieList.length === 0 ? (
                <Spinner />
            ) : (
                <ul>
                    {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}

            <button className="btn mx-auto block cursor-pointer" onClick={() => loadPage(page)}>
                Load More
            </button>
        </section>
    )
}
export default AllMovies
