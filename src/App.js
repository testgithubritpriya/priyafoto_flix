import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Photos from "./Components/Photos";
import Favourites from "./Components/Favourites";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [searchQuery, setsearchQuery] = useState("");
  const [favouritePhotos, setFavouritePhotos] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setsearchQuery(e.target[0].value);
  };

  const handleAddFavorite = (photo) => {
    setFavouritePhotos((prevFavourites) => [...prevFavourites, photo]);
  };

  const handleRemoveFavourite = (photoId) => {
    setFavouritePhotos((prevFavourites) =>
      prevFavourites.filter((favPhoto) => favPhoto.id !== photoId)
    );
  };

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <div className="navbar_logo">FotoFlix</div>
          <form
            action=""
            className="navbar_search-form"
            onSubmit={handleSearch}
          >
            <input type="text" className="form-input" placeholder="search" />
            <button type="submit" className="submit-btn">
              <FaSearch />
            </button>
          </form>
          <div className="navbar_links">
            <Link to="/favourite">Favourites</Link>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Photos
                searchQuery={searchQuery}
                onFavoriteClick={handleAddFavorite}
              />
            }
          />
          <Route
            path="/favourite"
            element={
              <Favourites
                favouritePhotos={favouritePhotos}
                handleRemoveFavourite={handleRemoveFavourite}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
