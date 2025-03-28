import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      url: "src/assets/heroSlider/slide1.jpg",
      title: "Empowering Farmers with AI",
      description:
        "Leverage AI to plan your crops and boost productivity with the latest farming technologies.",
    },
    {
      url: "src/assets/heroSlider/slide2.jpg",
      title: "Join the Forum",
      description:
        "Connect with experts and other farmers to share knowledge, tips, and experiences.",
    },
    {
      url: "src/assets/heroSlider/slide3.jpg",
      title: "AI-Powered Assistance",
      description:
        "Get personalized AI-driven guidance for your farming needs, from crop selection to market insights.",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative w-full pt-20">
      {/* Main Slider Container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
              index === currentSlide
                ? "translate-x-0"
                : index < currentSlide
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Overlay Text & Buttons */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl mb-6">{slides[currentSlide].description}</p>
          <div className="space-x-4">
            <div className="space-x-4">
              <Link to="/crop-calendar">
                <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700">
                  Explore Crop Calendar
                </button>{" "}
              </Link>
              <Link to="/forum">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                  Join Forum
                </button>
              </Link>
              <Link to="/agri-assistance">
                <button className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-700">
                  Get Agri Assistant Help
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white scale-110"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
    </div>
  );
};

export default ImageSlider;
