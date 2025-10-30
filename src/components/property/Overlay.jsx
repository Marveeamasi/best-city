import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "./Experience";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";
import { slideAtom } from "./Overlay"; // This is correct — self-import for atom

export { slideAtom }; // Re-export

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync display with current slide instantly
  const currentScene = scenes[slide];

  // Handle swipe / keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % scenes.length);
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + scenes.length) % scenes.length);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setSlide]);

  // Optional: Add swipe on touch devices
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      if (!touchStartX) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        setSlide((s) => (diff > 0 ? (s + 1) % scenes.length : (s - 1 + scenes.length) % scenes.length));
      }
      touchStartX = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [setSlide]);

  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-between pointer-events-none text-black">
      {/* Logo */}
      <Link to="/" className="pointer-events-auto flex items-center justify-center mx-auto mt-8 animate-fade-in">
        <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
          <circle cx="15" cy="20" r="10" stroke="#0682ff" strokeWidth="2"/>
          <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
        </svg>
        <span className="text-2xl font-bold text-[var(--color-primary-700)]">BestCity</span>
      </Link>

      {/* Content */}
      <div
        className={`bg-gradient-to-t from-white/95 to-transparent pt-20 pb-8 px-4 flex flex-col items-center text-center transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-2xl lg:text-5xl font-extrabold mb-2 animate-slide-up">
          {currentScene.name}
        </h1>
        <p className="text-xs lg:text-sm italic text-black/60 max-w-2xl animate-slide-up animation-delay-100">
          {currentScene.description}
        </p>

        {/* Stats */}
        <div className="flex gap-8 lg:gap-12 mt-6 animate-slide-up animation-delay-200">
          <Stat label="Total Return" value={`${currentScene.targetProfitability}%`} />
          <Stat label="ROI" value={`${currentScene.roi}%`} />
          <Stat label="Valuation" value={currentScene.valuation} />
        </div>

        {/* Invest Button */}
        <button className="pointer-events-auto btn w-full max-w-md mt-8 flex items-center justify-center text-lg lg:text-xl animate-slide-up animation-delay-300">
          <FaWallet className="mr-2" />
          Invest Now
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2 mt-8 animate-fade-in animation-delay-400">
          {scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                i === slide ? "bg-blue-600 w-8" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Component
const Stat = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <p className="font-bold text-lg lg:text-2xl text-blue-600">{value}</p>
    <p className="text-xs lg:text-sm text-black/70 mt-1">{label}</p>
  </div>
);