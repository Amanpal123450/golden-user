// RewardPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RewardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [reward, setReward] = useState(null);

  useEffect(() => {
    // 1️⃣ Try to get reward from navigation state
    if (location.state?.reward) {
      setReward(location.state.reward);
      localStorage.setItem("reward_data", JSON.stringify(location.state.reward));
    } 
    // 2️⃣ Or fallback to localStorage if user refreshes the page
    else {
      const stored = localStorage.getItem("reward_data");
      if (stored) {
        setReward(JSON.parse(stored));
      } else {
        // If no data at all → redirect to verify
        navigate("/verify");
      }
    }
  }, [location, navigate]);

  if (!reward) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <h3>Loading reward...</h3>
      </div>
    );
  }

  const handleClaim = () => {
    navigate("/verify");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light flex-column text-center">
      <h1 className="text-warning fw-bold mb-3">🎁 Congratulations!</h1>
      <p className="fs-5 mb-4">You’ve unlocked your exclusive reward!</p>

      {/* Rotating Reward Image */}
      <motion.img
        src={reward.media}
        alt="Reward Gift"
        className="mb-4 rounded shadow"
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
      />

      {/* Reward Number */}
      <p className="text-light fw-semibold mb-3">
        Reward Number: <span className="text-warning">{reward.reward_number}</span>
      </p>

      {/* Claim Reward Button */}
      <button
        className="btn btn-warning fw-bold px-5 py-2"
        onClick={handleClaim}
      >
        Claim Another Reward
      </button>
    </div>
  );
}
