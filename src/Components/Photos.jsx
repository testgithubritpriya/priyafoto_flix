import React from "react";
import { useState, useEffect } from "react";
import { FaHeart, FaDownload, FaShare, FaThumbsUp } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const Photos = ({ searchQuery, isFavorite, onFavoriteClick, ...photo }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [favouritePhotos, setFavouritePhotos] = useState([]);
  const [lightboxIndex, setlightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const clientID = "?client_id=jyXLx6QFKERRsUF2y9Bx4zJpQm_dcUNiewUSr5_eR64";
      const mainUrl = "https://api.unsplash.com/photos/";
      let url = mainUrl + clientID;

      if (searchQuery) {
        url = `https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}`;
      }

      url += `&page=${page}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setPhotos((oldPhotos) => [...oldPhotos, ...(data.results || data)]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchImages();
  }, [searchQuery, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const handleFavouriteClick = (photoId) => {
    const existingIndex = favouritePhotos.findIndex(
      (favPhoto) => favPhoto.id === photoId
    );
    if (existingIndex !== -1) {
      setFavouritePhotos((prevFavourites) => {
        prevFavourites.filter((favPhoto) => favPhoto.id !== photoId);
      });
    } else {
      const photoToAdd = photos.find((photo) => photo.id === photoId);
      setFavouritePhotos((prevFavourites) => [...prevFavourites, photoToAdd]);
    }
  };

  const handleShare = (photoUrl) => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Checkout this awesome photo:${photoUrl}`
    )}`;
    window.open(shareUrl, "_blank");
  };

  const handleDownload = (photoUrl, photoId) => {
    const link = document.createElement("a");
    link.href = photoUrl;
    link.download = `photo_${photoId}.jpg`;
    link.click();
  };

  const openLightbox = (index) => {
    setlightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <main>
      <section className="photos">
        <div className="photos-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            photos.map((photo, index) => (
              <article
                key={photo.id}
                className={`photo 
              ${
                favouritePhotos.some((favPhoto) => favPhoto.id === photo.id)
                  ? "favourite-photo"
                  : ""
              }`}
              >
                <img
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  onClick={() => openLightbox(index)}
                />
                <div className="photo-info">
                  <div className="photos-center">
                    <div className="photo-header">
                      <h4>{photo.user.name}</h4>
                      <button
                        className={`favourite-btn ${
                          favouritePhotos.some(
                            (favPhoto) => favPhoto.id === photo.id
                          )
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleFavouriteClick(photo.id)}
                      >
                        <FaHeart />
                      </button>
                    </div>
                    <div className="photo-actions">
                      <p>
                        <FaHeart className="heart-icon" />
                        {photo.likes}
                      </p>
                      <button
                        className="share-btn"
                        onClick={() => handleShare(photo.urls.regular)}
                      >
                        <FaShare />
                      </button>
                      <button
                        className="download-btn"
                        onClick={() =>
                          handleDownload(photo.urls.full, photo.id)
                        }
                      >
                        <FaDownload />
                      </button>
                    </div>
                    <a href={photo.user.portfolio_url}>
                      <img
                        src={photo.user.profile_image.medium}
                        className="user-img"
                        alt={photo.user.name}
                      />
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={photos[lightboxIndex].urls.full}
          onCloseRequest={closeLightbox}
        />
      )}
    </main>
  );
};

export default Photos;
