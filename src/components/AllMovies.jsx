import React from 'react'
import Spinner from "./Spinner.jsx";
import MovieCard from "./MovieCard.jsx";

const AllMovies = ({movies, loading, errorMessage}) => {
    return (
        <section className='all-movies'>
            <h2>All Movies</h2>

            {loading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
            ) : (
                <ul>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </ul>
            )}
        </section>
    )
}
export default AllMovies
