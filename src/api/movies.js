import {getTrendingMovies, updateSearchCount} from "../db/appwrite.js";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    }
}

export const fetchExternalLink = async (movie_id) => {
    try {
        const ENDPOINT = `${BASE_URL}/movie/${encodeURIComponent(movie_id)}/external_ids`;

        const response = await fetch(ENDPOINT, API_OPTIONS)

        if (!response.ok) {
            throw new Error('Could not fetch external link');
        }

        const data = await response.json();

        if (data.Response === 'False') {
            return null;
        }

        return `https://www.imdb.com/title/${data.imdb_id}/`

    } catch (error) {
        console.error(`Error fetching external link: ${error}`);
        return null;
    }
}

export const fetchMovies = async (query = '', page = 1, setMoviesLoading, setMoviesErrorMessage,
                                  setMovieList) => {
    if (page === 1) setMoviesLoading(true);
    setMoviesErrorMessage('');
    try {
        const ENDPOINT = query
            ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
            : `${BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

        const response = await fetch(ENDPOINT, API_OPTIONS);

        if (!response.ok) throw new Error('Could not fetch movies');

        const data = await response.json();

        if (data.Response === 'False') {
            setMoviesErrorMessage(data.Error || 'Failed to fetch movies');
            setMovieList([]);
            return;
        }

        const results = data.results || [];

        // Append after page 1, replace on page 1
        setMovieList(prev => (page === 1 ? results : [...prev, ...results]));

        if (page === 1 && query && results.length > 0) {
            await updateSearchCount(query, results[0]);
        }
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setMoviesErrorMessage('Could not fetch movies, please try again later.');
    } finally {
        if (page === 1) setMoviesLoading(false);
    }
}

export const loadTrendingMovies = async (setTrendingMoviesLoading, setTrendingMovies,
                                         setTrendingMoviesErrorMessage) => {
    setTrendingMoviesLoading(true);
    setTrendingMoviesErrorMessage('');
    try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
    } catch (error) {
        console.log(`Error fetching trending movies: ${error}`);
        setTrendingMoviesErrorMessage('Could not fetch trending movies, please try again later.');
        setTrendingMovies([]);
    } finally {
        setTrendingMoviesLoading(false);
    }
}