import { FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function SuccessUpload() {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Trigger check icon appearance after circle animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000); // Match this to animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
      <div className="bg-white/50 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-lg">
        <div className="relative w-56 h-56 flex justify-center items-center">
          {/* SVG Circle Animation */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00c951"
              strokeWidth="7"
              strokeLinecap="round"
              style={{
                strokeDasharray: "282.6", // Circumference of circle = 2πr
                strokeDashoffset: "282.6", // Start with full dashoffset
                animation: "drawCircle 1s ease forwards",
              }}
            />
          </svg>

          {/* Check Icon that appears after animation */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              animationComplete ? "opacity-100" : "opacity-0"
            }`}
          >
            <FaCheck size={150} className="text-green-500" />
          </div>
        </div>

        <h5 className="h5 text-green-500 text-center">UPLOADED SUCCESSFULLY</h5>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes drawCircle {
          0% {
            stroke-dashoffset: 282.6;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
