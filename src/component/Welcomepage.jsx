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
      const response = await axios.post(
        `https://golden-4.onrender.com/api/user-rewards/verify`,
        { gift_number: giftNumber.trim() }
      );

      if (response.data.success) {
        // Save reward data
        localStorage.setItem("reward_data", JSON.stringify(response.data.reward));

        // Navigate to reward page
        navigate("/reward", { 
          state: { reward: response.data.reward } 
        });
      }
    } catch (err) {
      if (err.response) {
        const msg = err.response.data.message || "Invalid or already used gift number";
        setError(msg);

        if (err.response.data.redirect === "/error") {
          setTimeout(() => {
            navigate("/error", { 
              state: { message: msg } 
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
            onChange={(e) => setGiftNumber(e.target.value.toUpperCase())}
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
