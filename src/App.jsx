import React, {useState} from 'react'
import {useDebounce} from "react-use";
import Header from "./components/Header.jsx";
import TrendingMovies from "./components/TrendingMovies.jsx";
import AllMovies from "./components/AllMovies.jsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

    return (
        <main>
            <div className="pattern" ></div>

            <div className="wrapper">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <TrendingMovies />
                <AllMovies debouncedSearchTerm={debouncedSearchTerm} />
            </div>
        </main>
    )
}
export default App
