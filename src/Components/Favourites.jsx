import React from "react";
import Photos from "./Photos";

const Favourites = ({ FavouritePhotos, handleRemoveFavourite }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar_logo">FotoFlix</div>
        <div className="navbar_links">
          <a href="/">Home</a>
        </div>
      </nav>
      <main>
        <section className="photos">
          <div className="photos-center">
            {FavouritePhotos.map((image, index) => {
              return (
                <Photos
                  key={index}
                  {...image}
                  isFavourite={true}
                  onFavouriteClick={() => handleRemoveFavourite(image)}
                >
                  <span>Added to favourites</span>
                </Photos>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favourites;
