import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "./Movie.css";

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const getMovies = async () => {
        const api_key = "706d8ab389d50454de0a171dbf8ca634";
        const base_url = "https://api.themoviedb.org/3/discover/movie";
        const num_pages = 2; // Nombre de pages à récupérer
        const allMovies = new Set(); // Utilisation d'un ensemble pour éviter les doublons

        for (let page = 1; page <= num_pages; page++) {
            const url = `${base_url}?api_key=${api_key}&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();
            data.results.forEach(movie => allMovies.add(movie)); // Ajout des films à l'ensemble
        }

        setMovieList(Array.from(allMovies)); // Convertir l'ensemble en tableau et le mettre dans l'état
        setFilteredMovieList(Array.from(allMovies)); // Utiliser la même liste pour le filtrage initial
    };

    useEffect(() => {
        getMovies();
    }, []);

    const handleSearch = (filteredList) => {
        setFilteredMovieList(filteredList);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);

    };

    return (
        <div className="app_movie">
            <div className="search">
                <SearchBar list={movieList} setList={handleSearch} />
                <ul>
                    {filteredMovieList.map((movie) => (

                        <div className="box_search_movie" key={movie.id}>
                            <li onClick={() => handleMovieSelect(movie)}>
                                <img
                                    className="img-search"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt=""
                                />
                                <p>{movie.title}</p>
                            </li>
                        </div>

                    ))}
                </ul>
            </div>

            <div className="info_movie">

                {!selectedMovie ? ( // Si aucun film n'est sélectionné, affiche le message "Choisissez un film"
                    <div className="info_movie_box">

                        <h1>Choisissez un film...</h1>
                    </div>
                ) : ( // Sinon, affiche les détails du film sélectionné
                    <div className="box_movie" >
                        <img className="background_img_selected"

                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} alt="image-film-fond"
                        />



                        <div className="info">
                            <img
                                className="img_selected"
                                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                alt="image-film"
                            />
                            <div className="info_movie_box">
                                <h2>{selectedMovie.title}</h2>
                                <h3>Date :</h3>
                                <p>{selectedMovie.release_date}</p>
                                <h3>Description :</h3>
                                <p>{selectedMovie.overview}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movie;
