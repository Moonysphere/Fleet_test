import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "./Movie.css"; // Importation du fichier de styles CSS

function Movie() {
    // État pour stocker la liste complète de films
    const [movieList, setMovieList] = useState([]);
    // État pour stocker la liste de films filtrée
    const [filteredMovieList, setFilteredMovieList] = useState([]);
    // État pour stocker le film sélectionné
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Fonction pour récupérer la liste de films depuis l'API
    const getMovies = async () => {
        const api_key = "706d8ab389d50454de0a171dbf8ca634";
        const base_url = "https://api.themoviedb.org/3/discover/movie";
        const num_pages = 2; // Nombre de pages à récupérer
        const allMovies = new Set(); // Utilisation d'un ensemble pour éviter les doublons

        for (let page = 1; page <= num_pages; page++) {
            const url = `${base_url}?api_key=${api_key}&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();
            // Ajout des films à l'ensemble
            data.results.forEach(movie => allMovies.add(movie));
        }

        // Convertir l'ensemble en tableau et le mettre dans l'état
        setMovieList(Array.from(allMovies));
        // Utiliser la même liste pour le filtrage initial
        setFilteredMovieList(Array.from(allMovies));
    };

    // Appel de la fonction getMovies une seule fois lors du montage du composant
    useEffect(() => {
        getMovies();
    }, []);

    // Fonction pour gérer la recherche de films
    const handleSearch = (filteredList) => {
        setFilteredMovieList(filteredList);
    };

    // Fonction pour gérer la sélection d'un film
    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="app_movie">
            <div className="search">
                {/* Composant SearchBar pour la barre de recherche */}
                <SearchBar list={movieList} setList={handleSearch} />
                <ul>
                    {/* Mapping à travers la liste de films filtrée */}
                    {filteredMovieList.map((movie) => (
                        <div className="box_search_movie" key={movie.id}>
                            {/* Événement onClick pour sélectionner un film */}
                            <li onClick={() => handleMovieSelect(movie)}>
                                {/* Image du film */}
                                <img
                                    className="img-search"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt=""
                                />
                                {/* Titre du film */}
                                <p>{movie.title}</p>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="info_movie">
                {/* Condition pour afficher les détails du film sélectionné */}
                {!selectedMovie ? ( // Si aucun film n'est sélectionné
                    <div className="info_movie_box">
                        <h1>Choisissez un film...</h1> {/* Message */}
                    </div>
                ) : ( // Sinon, affiche les détails du film sélectionné
                    <div className="box_movie">
                        {/* Image de fond du film */}
                        <img className="background_img_selected"
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} alt="image-film-fond"
                        />

                        <div className="info">
                            {/* Image du film sélectionné */}
                            <img
                                className="img_selected"
                                src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                                alt="image-film"
                            />
                            <div className="info_movie_box">
                                {/* Détails du film sélectionné */}
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
