import React from 'react'
import Spinner from "./Spinner.jsx";
import {fetchExternalLink} from "../api/movies.js";

const TrendingMovies = ({movies, loading, errorMessage}) => {
    return (
        <section>
            {loading ? (
                <Spinner />
            ) : errorMessage ? (
                <p className='text-red-500'>{errorMessage}</p>
            ) : (
                movies.length > 0 && <section className='trending'>
                    <h2>Trending Movies</h2>
                    <ul>
                        {movies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p>{index + 1}</p>
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    onClick={
                                        async () => window.open(await fetchExternalLink(movie.movie_id), "_blank")
                                    }
                                    style={{ cursor: "pointer" }}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </section>
    )
}
export default TrendingMovies
