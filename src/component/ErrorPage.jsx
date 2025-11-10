import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
      <div
        className="text-center p-4 rounded shadow"
        style={{
          backgroundColor: "#1e293b",
          maxWidth: "420px",
          width: "90%",
        }}
      >
        <FaExclamationCircle
          size={50}
          className="text-danger mb-3"
        />
        <h4 className="text-danger fw-bold">Invalid Gift Number</h4>
        <p className="text-secondary mb-4">
          The number you entered is not recognized or has already been used.
        </p>
        <button
          className="btn btn-secondary fw-bold px-4"
          onClick={() => navigate("/")}
        >
          Try Again
        </button>
      </div>

      <footer className="text-center mt-5 small text-secondary">
        <p>© 2025 Golden Commando. All Rights Reserved.</p>
        <p>
          Address: chungi rath 5678 | Email:{" "}
          <a href="mailto:goldenc@gmail.com" className="text-warning">
            goldenc@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
