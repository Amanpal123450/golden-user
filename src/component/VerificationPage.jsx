import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function VerificationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
    address: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ✅ Field validation
  const validateField = (name, value) => {
    value = value.trim();
    switch (name) {
      case "name":
        if (!value) return "Full name is required";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Name can only contain letters and spaces";
        if (value.length < 3) return "Name must be at least 3 characters";
        break;

      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address";
        break;

      case "phone":
        if (!value) return "Phone number is required";
        if (!/^[0-9]+$/.test(value))
          return "Phone number must contain only digits";
        if (value.length !== 10)
          return "Phone number must be exactly 10 digits";
        break;

      case "country":
        if (!value) return "Country is required";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Country name can only contain letters";
        break;

      case "state":
        if (!value) return "State is required";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "State name can only contain letters";
        break;

      case "district":
        if (!value) return "District is required";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "District can only contain letters";
        break;

      case "pincode":
        if (!value) return "Pincode is required";
        if (!/^[0-9]{6}$/.test(value))
          return "Pincode must be exactly 6 digits";
        break;

      case "address":
        if (!value) return "Address is required";
        if (value.length < 10)
          return "Address should be at least 10 characters";
        break;

      default:
        return "";
    }
    return "";
  };

  // ✅ Full form validation
  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (!photo) newErrors.photo = "Please upload your photo";
    else if (!photo.type.startsWith("image/"))
      newErrors.photo = "Uploaded file must be an image";
    else if (photo.size > 2 * 1024 * 1024)
      newErrors.photo = "Photo size must be under 2 MB";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input change + restrict invalid chars
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Prevent invalid characters live
    if (name === "phone") newValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    if (name === "pincode") newValue = value.replace(/[^0-9]/g, "").slice(0, 6);
    if (["name", "country", "state", "district"].includes(name))
      newValue = value.replace(/[^a-zA-Z\s]/g, "");

    setForm((prev) => ({ ...prev, [name]: newValue }));

    // Live validation
    setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
  };

  // ✅ Handle photo upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, photo: "File must be an image" }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Photo size must be under 2 MB",
        }));
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, photo: "" }));
    }
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (photo) formData.append("photo", photo);

      const res = await axios.post(
        "https://golden-4.onrender.com/api/verification/submit",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting verification:", error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  // ✅ Download Receipt
  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("🎁 Reward Claim Receipt", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const yStart = 35;
    const lineHeight = 10;
    const data = [
      ["Full Name:", form.name],
      ["Email:", form.email],
      ["Phone:", form.phone],
      ["Country:", form.country],
      ["State:", form.state],
      ["District:", form.district],
      ["Pin Code:", form.pincode],
      ["Address:", form.address],
    ];

    data.forEach(([label, value], index) => {
      doc.text(`${label} ${value}`, 20, yStart + index * lineHeight);
    });

    if (photoPreview) {
      doc.addImage(photoPreview, "JPEG", 150, 30, 40, 40);
    }

    doc.text("✅ Thank you for verifying your reward claim!", 20, 130);
    doc.save("Reward_Receipt.pdf");
  };

  // ✅ Success Page
  if (submitted) {
    return (
      <div className="d-flex flex-column vh-100 bg-dark text-light">
        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center p-3 overflow-auto">
          <div
            className="bg-light text-dark rounded p-4 shadow w-100"
            style={{ maxWidth: "550px" }}
          >
            <h2 className="text-success fw-bold mb-3">🎉 Thank You!</h2>
            <p>Your reward claim has been submitted successfully.</p>
            <hr />
            <h5 className="text-primary mb-3 fw-bold">
              📄 Your Submitted Details
            </h5>
            <ul className="list-group text-start mb-3">
              {Object.entries(form).map(([key, value]) => (
                <li className="list-group-item" key={key}>
                  <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}
                </li>
              ))}
            </ul>

            {photoPreview && (
              <div className="mb-3">
                <h6 className="fw-bold">Uploaded Photo:</h6>
                <img
                  src={photoPreview}
                  alt="User"
                  className="rounded shadow"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <button
              onClick={downloadReceipt}
              className="btn btn-success w-100 fw-bold mt-3"
            >
              📥 Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default Form UI
  return (
    <div className="d-flex flex-column vh-100 bg-dark text-light">
      <div
        className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start p-3"
        style={{ minHeight: 0 }}
      >
        <div
          className="bg-light text-dark rounded p-4 shadow w-100"
          style={{ maxWidth: "550px", marginTop: "30px", marginBottom: "50px" }}
        >
          <h2 className="text-center text-warning fw-bold mb-3">
            🎁 Reward Claim Verification
          </h2>
          <p className="text-center text-secondary mb-4">
            Enter your details to claim your reward.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Country", name: "country", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "District", name: "district", type: "text" },
              { label: "Pin Code", name: "pincode", type: "text" },
            ].map((field) => (
              <div key={field.name} className="mb-3 text-start">
                <label className="form-label fw-bold">{field.label}</label>
                <input
                  type={field.type}
                  className={`form-control ${
                    errors[field.name] ? "is-invalid" : ""
                  }`}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                {errors[field.name] && (
                  <small className="text-danger">{errors[field.name]}</small>
                )}
              </div>
            ))}

            <div className="mb-3 text-start">
              <label className="form-label fw-bold">Local Area Address</label>
              <textarea
                className={`form-control ${
                  errors.address ? "is-invalid" : ""
                }`}
                rows="2"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your full local address"
              ></textarea>
              {errors.address && (
                <small className="text-danger">{errors.address}</small>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bold">Upload Your Photo</label>
              <input
                type="file"
                className={`form-control ${errors.photo ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={handlePhoto}
              />
              {errors.photo && (
                <small className="text-danger">{errors.photo}</small>
              )}
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-bold">
              Claim Reward
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
