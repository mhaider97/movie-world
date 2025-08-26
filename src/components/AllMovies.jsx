import React, {useEffect, useState} from 'react'
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";
import {fetchMovies} from "../api/movies.js";

const AllMovies = ({debouncedSearchTerm}) => {
    const [movieList, setMovieList] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(false);
    const [moviesErrorMessage, setMoviesErrorMessage] = useState('');

    useEffect(() => {
        fetchMovies(debouncedSearchTerm, setMoviesLoading, setMoviesErrorMessage, setMovieList).then(r => r);
    }, [debouncedSearchTerm])

    return (
        <section className='all-movies'>
            <h2>All Movies</h2>

            {moviesLoading ? (
                <Spinner />
            ) : moviesErrorMessage ? (
                <p className='text-red-500'>{moviesErrorMessage}</p>
            ) : (
                <ul>
                    {movieList.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </section>
    )
}
export default AllMovies
