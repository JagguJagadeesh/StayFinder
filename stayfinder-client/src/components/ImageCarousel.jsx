import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) return <p>No images available</p>;

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg shadow-pink-500">
      <div className="w-full h-80 ">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover rounded-lg"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
      >
        <FaCircleArrowLeft className="text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
      >
        <FaCircleArrowRight className="text-2xl" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
