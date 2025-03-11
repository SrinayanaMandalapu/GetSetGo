import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./WelcomePage.css"; 

const places = [
  { id: 1, image: "great_wall.jpg", name: "Great Wall of China" },
  { id: 2, image: "eiffel_tower.jpg", name: "Eiffel Tower" },
  { id: 3, image: "statue_liberty.jpg", name: "Statue of Liberty" },
  { id: 4, image: "sydney_opera.jpg", name: "Sydney Opera House" },
  { id: 5, image: "goa.jpg", name: "Goa" },
  { id: 6, image: "charminar.jpg", name: "Charminar" },
  { id: 7, image: "pondicherry.jpg", name: "Pondicherry" },
  { id: 8, image: "taj_mahal.jpg", name: "Taj Mahal" },
];

const WelcomePage = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Trip Planner</h1>
      <p className="welcome-subtitle">
        Sign in to create and manage your dream trips!
      </p>

      <div className="button-group">
        <button onClick={() => navigate("/login")}>
          Sign In
        </button>
        <button onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>

      <Slider {...settings} className="carousel">
        {places.map((place) => (
          <div key={place.id} className="carousel-item">
            <img src={`/${place.image}`} alt={place.name} />
            <div className="image-overlay">{place.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WelcomePage;
