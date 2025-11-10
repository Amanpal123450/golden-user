import { useState } from "react";
import jsPDF from "jspdf"; // <-- install this with: npm install jspdf

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

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (!form.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.district.trim()) newErrors.district = "District is required";
    if (!form.pincode.match(/^[0-9]{6}$/))
      newErrors.pincode = "Enter a valid 6-digit pin code";
    if (!form.address.trim())
      newErrors.address = "Local area address is required";
    if (!photo) newErrors.photo = "Please upload your photo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  // ✅ Download PDF receipt
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
  doc.text(`${label}: ${value}`, 20, yStart + index * lineHeight);
});


    if (photoPreview) {
      doc.addImage(photoPreview, "JPEG", 150, 30, 40, 40);
    }

    doc.text("✅ Thank you for verifying your reward claim!", 20, 130);
    doc.save("Reward_Receipt.pdf");
  };

  // ✅ Receipt view after submission
  if (submitted) {
    return (
      <div className="d-flex flex-column vh-100 bg-dark text-light">
        

        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center p-3 overflow-auto">
          <div className="bg-light text-dark rounded p-4 shadow w-100" style={{ maxWidth: "550px" }}>
            <h2 className="text-success fw-bold mb-3">🎉 Thank You!</h2>
            <p>Your reward claim has been submitted successfully.</p>
            <hr />
            <h5 className="text-primary mb-3 fw-bold">📄 Your Submitted Details</h5>
            <ul className="list-group text-start mb-3">
              <li className="list-group-item">
                <b>Full Name:</b> {form.name}
              </li>
              <li className="list-group-item">
                <b>Email:</b> {form.email}
              </li>
              <li className="list-group-item">
                <b>Phone:</b> {form.phone}
              </li>
              <li className="list-group-item">
                <b>Country:</b> {form.country}
              </li>
              <li className="list-group-item">
                <b>State:</b> {form.state}
              </li>
              <li className="list-group-item">
                <b>District:</b> {form.district}
              </li>
              <li className="list-group-item">
                <b>Pin Code:</b> {form.pincode}
              </li>
              <li className="list-group-item">
                <b>Address:</b> {form.address}
              </li>
            </ul>

            {photoPreview && (
              <div className="mb-3">
                <h6 className="fw-bold">Uploaded Photo:</h6>
                <img
                  src={photoPreview}
                  alt="User"
                  className="rounded shadow"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
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

  // ✅ Default form view
  return (
    <div className="d-flex flex-column vh-100">
      


      <div
        className="flex-grow-1 overflow-auto bg-dark text-light d-flex justify-content-center align-items-start p-3"
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

          <form onSubmit={handleSubmit}>
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
                  className="form-control"
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
                className="form-control"
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
                className="form-control"
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