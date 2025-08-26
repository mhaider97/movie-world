import React, {useEffect, useState} from 'react'
import Spinner from "./Spinner.jsx";
import {fetchExternalLink, loadTrendingMovies} from "../api/movies.js";

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingMoviesLoading, setTrendingMoviesLoading] = useState(false);
    const [trendingMoviesErrorMessage, setTrendingMoviesErrorMessage] = useState('');

    useEffect(() => {
        loadTrendingMovies(setTrendingMoviesLoading, setTrendingMovies, setTrendingMoviesErrorMessage);
    }, [])

    return (
        <section>
            {trendingMoviesLoading ? (
                <Spinner />
            ) : trendingMoviesErrorMessage ? (
                <p className='text-red-500'>{trendingMoviesErrorMessage}</p>
            ) : (
                trendingMovies.length > 0 && <section className='trending'>
                    <h2>Trending Movies</h2>
                    <ul>
                        {trendingMovies.map((movie, index) => (
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
