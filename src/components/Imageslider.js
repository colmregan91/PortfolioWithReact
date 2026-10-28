import React, { useState, useEffect } from "react";
import "../imageslider.css";

export default function ImageSlider({ images, width }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="slider-wrapper">
      <div
        className="slider-container"
        style={width ? { width, maxWidth: "90%" } : undefined}
      >
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              src={`images/${src}`}
              alt={`slide-${index}`}
              className="slide-image"
            />
          ))}
        </div>
      </div>

      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
