import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WelcomePage() {
  const [giftNumber, setGiftNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (giftNumber.trim() === "") {
      setError("Please enter a gift number.");
      return;
    }

    setLoading(true);

    try {
      // API call to verify gift number
      const response = await axios.post(
        `http://localhost:5000/api/user-rewards/verify`,
        { gift_number: giftNumber }
      );
      console.log("Verification response:", response.data);

      if (response.data.success) {
        localStorage.setItem("reward_data", JSON.stringify(response.data.reward));
        // Store reward data for/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zb next page (optional)
        
        // Navigate to reward page
        navigate("/reward", { 
          state: { reward: response.data.reward} 
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      
      // Handle different error cases
      if (err.response) {
        setError(err.response.data.message || "Invalid or already used gift number");
        
        // Navigate to error page if needed
        if (err.response.data.redirect === "/error") {
          setTimeout(() => {
            navigate("/error", { 
              state: { message: err.response.data.message } 
            });
          }, 1500);
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container d-flex justify-content-center align-items-center">
      <div className="card-container text-center p-4 p-md-5">
        <h3 className="text-warning fw-bold mb-3">Welcome</h3>
        <p className="text-light mb-2">
          Enter your exclusive gift number below to proceed.
        </p>
        {error && <p className="text-danger small mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control text-center mb-3"
            placeholder="ENTER GIFT NUMBER"
            value={giftNumber}
            onChange={(e) => setGiftNumber(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn btn-warning fw-bold w-100 py-2"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}