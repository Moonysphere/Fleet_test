import React, { useState, useEffect } from "react";
import "./SearchBar.css"

const SearchBar = ({ list, setList }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [originalList, setOriginalList] = useState([]);

    useEffect(() => {
        setOriginalList(list);
    }, [list]);

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filtrer la liste en fonction du terme de recherche
        const filteredList = originalList.filter((movie) =>
            movie.original_title.toLowerCase().includes(value.toLowerCase())
        );

        // Mettre à jour la liste affichée
        setList(filteredList);
    };

    const handleKeyDown = (event) => {
        // Si la touche supprimée est pressée et le terme de recherche est vide,
        // on réinitialise la liste affichée à la liste complète
        if (event.key === "Backspace" && searchTerm === "") {
            setList(originalList);
        }
    };

    return (
        <input
            type="text"
            placeholder="Recherche..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
        />
    );
};

export default SearchBar;