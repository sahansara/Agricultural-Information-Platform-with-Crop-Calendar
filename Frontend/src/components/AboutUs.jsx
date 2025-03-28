import React, { useEffect, useRef, useState } from "react";
import "../index.css";

const Counter = ({ end, duration = 2000, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.min(Math.floor(progress * end), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return (
    <div ref={countRef} className="text-center">
      <div className="text-4xl font-bold text-red-600">
        {count}
        <span className="text-red-600">+</span>
      </div>
      <div className="text-gray-600 mt-2">{label}</div>
    </div>
  );
};

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <div
      id="about-us"
      ref={componentRef}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-16 px-4"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-in-left" : "opacity-0"
            }`}
          >
            <h3 className="text-2xl font-semibold text-gray-900">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              Founded with a vision to revolutionize the industry, we've been at
              the forefront of innovation for over a decade. Our journey began
              with a simple idea: to create solutions that make a difference in
              people's lives.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we continue to push boundaries and set new standards in
              everything we do. Our commitment to excellence and customer
              satisfaction remains unwavering as we grow and evolve.
            </p>
          </div>

          <div
            className={`space-y-6 ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            }`}
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We strive to deliver exceptional value through innovative
              solutions that empower businesses and individuals alike. Our
              mission is to create lasting impact through technology and
              human-centered design.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <Counter end={10} duration={2000} label="Years Experience" />
              <Counter end={500} duration={2000} label="Clients" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
