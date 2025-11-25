// import { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

// export default function VerificationPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     country: "",
//     state: "",
//     district: "",
//     pincode: "",
//     address: "",
//   });

//   const [rewardNumber, setRewardNumber] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState("");
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     const reward = JSON.parse(localStorage.getItem("reward_data"));
//     if (!reward?.reward_number) {
//       alert("No reward found. Please verify again.");
//       window.location.href = "/verify";
//       return;
//     }
//     setRewardNumber(reward.reward_number);
//   }, []);

//   const validateField = (name, value) => {
//     value = value.trim();
//     switch (name) {
//       case "name":
//         if (!value) return "Full name required";
//         if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
//         if (value.length < 3) return "Minimum 3 characters";
//         break;

//       case "email":
//         if (!value) return "Email required";
//         if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
//         break;

//       case "phone":
//         if (!value) return "Phone number required";
//         if (!/^[0-9]{10}$/.test(value)) return "Must be 10 digits";
//         break;

//       case "country":
//       case "state":
//       case "district":
//         if (!value) return `${name} required`;
//         if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters";
//         break;

//       case "pincode":
//         if (!/^[0-9]{6}$/.test(value)) return "Pincode must be 6 digits";
//         break;

//       case "address":
//         if (!value) return "Address required";
//         if (value.length < 10) return "Minimum 10 characters";
//         break;

//       default:
//         return "";
//     }
//     return "";
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     Object.entries(form).forEach(([key, value]) => {
//       const err = validateField(key, value);
//       if (err) newErrors[key] = err;
//     });

//     if (!photo) newErrors.photo = "Upload your photo";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let final = value;

//     if (name === "phone") final = value.replace(/\D/g, "").slice(0, 10);
//     if (name === "pincode") final = value.replace(/\D/g, "").slice(0, 6);
//     if (["name", "country", "state", "district"].includes(name))
//       final = value.replace(/[^a-zA-Z\s]/g, "");

//     setForm((prev) => ({ ...prev, [name]: final }));
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, final) }));
//   };

//   const handlePhoto = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const fd = new FormData();
//       Object.entries(form).forEach(([key, val]) => fd.append(key, val));
//       fd.append("photo", photo);
//       fd.append("reward_number", rewardNumber);

//       const res = await axios.post(
//         "https://golden-4.onrender.com/api/verification/submit",
//         fd,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert(res.data.message);
//       setSubmitted(true);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error submitting form");
//     }
//   };

//   if (submitted) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light text-center">
//         <div>
//           <h2 className="text-success fw-bold">🎉 Thank You!</h2>
//           <p>Your verification has been submitted successfully.</p>

//           <button className="btn btn-success mt-3 fw-bold" onClick={() => window.print()}>
//             📥 Download Receipt
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex flex-column  text-light">
//       <div className="container py-4">
//         <div
//           className="bg-light text-dark p-4 rounded shadow mx-auto"
//           style={{ maxWidth: "550px" }}
//         >
//           <h2 className="text-warning text-center fw-bold mb-3">
//             🎁 Reward Claim Verification
//           </h2>

//           <p className="text-center text-secondary">
//             Reward Number: <b>{rewardNumber}</b>
//           </p>

//           <form onSubmit={handleSubmit}>
//             {[
//               ["Full Name", "name"],
//               ["Email", "email"],
//               ["Phone", "phone"],
//               ["Country", "country"],
//               ["State", "state"],
//               ["District", "district"],
//               ["Pincode", "pincode"],
//             ].map(([label, name]) => (
//               <div className="mb-3 text-start" key={name}>
//                 <label className="form-label fw-bold">{label}</label>
//                 <input
//                   name={name}
//                   value={form[name]}
//                   onChange={handleChange}
//                   className={`form-control ${errors[name] ? "is-invalid" : ""}`}
//                 />
//                 {errors[name] && (
//                   <small className="text-danger">{errors[name]}</small>
//                 )}
//               </div>
//             ))}

//             <div className="mb-3 text-start">
//               <label className="form-label fw-bold">Address</label>
//               <textarea
//                 name="address"
//                 value={form.address}
//                 onChange={handleChange}
//                 className={`form-control ${errors.address ? "is-invalid" : ""}`}
//               ></textarea>
//               {errors.address && (
//                 <small className="text-danger">{errors.address}</small>
//               )}
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-bold">Upload Photo</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhoto}
//                 className={`form-control ${errors.photo ? "is-invalid" : ""}`}
//               />
//               {photoPreview && (
//                 <img
//                   src={photoPreview}
//                   width={120}
//                   height={120}
//                   className="mt-2 rounded"
//                   alt="preview"
//                 />
//               )}
//               {errors.photo && (
//                 <small className="text-danger">{errors.photo}</small>
//               )}
//             </div>

//             <button className="btn btn-warning w-100 fw-bold">
//               Submit Verification
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
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

  const [rewardNumber, setRewardNumber] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load reward number
  useEffect(() => {
    const reward = JSON.parse(localStorage.getItem("reward_data"));
    if (!reward?.reward_number) {
      alert("No reward found. Please verify again.");
      window.location.href = "/verify";
      return;
    }
    setRewardNumber(reward.reward_number);
  }, []);

  // Validation for each field
  const validateField = (name, value) => {
    value = value.trim();
    switch (name) {
      case "name":
        if (!value) return "Full name required";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed";
        if (value.length < 3) return "Minimum 3 characters";
        break;

      case "email":
        if (!value) return "Email required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
        break;

      case "phone":
        if (!value) return "Phone number required";
        if (!/^[0-9]{10}$/.test(value)) return "Must be 10 digits";
        break;

      case "country":
      case "state":
      case "district":
        if (!value) return `${name} required`;
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters";
        break;

      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) return "Pincode must be 6 digits";
        break;

      case "address":
        if (!value) return "Address required";
        if (value.length < 10) return "Minimum 10 characters";
        break;

      default:
        return "";
    }
    return "";
  };

  // Full form validation
  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      const err = validateField(key, value);
      if (err) newErrors[key] = err;
    });

    if (!photo) newErrors.photo = "Upload your photo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let final = value;

    if (name === "phone") final = value.replace(/\D/g, "").slice(0, 10);
    if (name === "pincode") final = value.replace(/\D/g, "").slice(0, 6);
    if (["name", "country", "state", "district"].includes(name))
      final = value.replace(/[^a-zA-Z\s]/g, "");

    setForm((prev) => ({ ...prev, [name]: final }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, final) }));
  };

  // Photo upload
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, val]) => fd.append(key, val));
      fd.append("photo", photo);
      fd.append("reward_number", rewardNumber);

      const res = await axios.post(
        "https://golden-4.onrender.com/api/verification/submit",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting form");
    }
  };

  // PDF Receipt (Old Version)
  // const downloadReceipt = () => {
  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(18);
  //   doc.text("🎁 Reward Claim Receipt", 20, 20);

  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(12);

  //   const fields = [
  //     ["Reward Number:", rewardNumber],
  //     ["Full Name:", form.name],
  //     ["Email:", form.email],
  //     ["Phone:", form.phone],
  //     ["Country:", form.country],
  //     ["State:", form.state],
  //     ["District:", form.district],
  //     ["Pincode:", form.pincode],
  //     ["Address:", form.address],
  //   ];

  //   let y = 40;

  //   fields.forEach(([label, value]) => {
  //     doc.text(`${label} ${value}`, 20, y);
  //     y += 10;
  //   });

  //   if (photoPreview) {
  //     doc.addImage(photoPreview, "JPEG", 150, 20, 40, 40);
  //   }

  //   doc.text("Thank you for verifying your reward claim!", 20, y + 20);
  //   doc.save("Reward_Receipt.pdf");
  // };
  const downloadReceipt = () => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("🎁 Reward Claim Receipt", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  const fields = [
    ["Reward Number:", rewardNumber],
    ["Full Name:", form.name],
    ["Email:", form.email],
    ["Phone:", form.phone],
    ["Country:", form.country],
    ["State:", form.state],
    ["District:", form.district],
    ["Pincode:", form.pincode],
    ["Address:", form.address],
  ];

  let y = 40;

  fields.forEach(([label, value]) => {
    doc.text(`${label} ${value}`, 20, y);
    y += 10;
  });

  if (photoPreview) {
    doc.addImage(photoPreview, "JPEG", 150, 20, 40, 40);
  }

  doc.text("Thank you for verifying your reward claim!", 20, y + 20);

  // 🔥 Download PDF
  doc.save("Reward_Receipt.pdf");

  // 🔥 Auto redirect after download
  setTimeout(() => {
    window.location.href = "/";  // Change to your desired page
  }, 500);
};


  // Submitted (Old Beautiful Version)
  if (submitted) {
    return (
      <div className="d-flex flex-column vh-100 bg-dark text-light">
        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-center p-3">
          <div className="bg-dark text-danger rounded p-4 shadow w-100" style={{ maxWidth: "550px" }}>
            <h2 className="text-success fw-bold mb-3">🎉 Thank You!</h2>
            <p>Your reward claim has been submitted successfully.</p>
            <hr />
            <h5 className="text-primary mb-3 fw-bold">📄 Your Submitted Details</h5>

            <ul className="list-group text-start mb-3">
              <li className="list-group-item"><b>Reward Number:</b> {rewardNumber}</li>
              <li className="list-group-item"><b>Full Name:</b> {form.name}</li>
              <li className="list-group-item"><b>Email:</b> {form.email}</li>
              <li className="list-group-item"><b>Phone:</b> {form.phone}</li>
              <li className="list-group-item"><b>Country:</b> {form.country}</li>
              <li className="list-group-item"><b>State:</b> {form.state}</li>
              <li className="list-group-item"><b>District:</b> {form.district}</li>
              <li className="list-group-item"><b>Pincode:</b> {form.pincode}</li>
              <li className="list-group-item"><b>Address:</b> {form.address}</li>
            </ul>

            {photoPreview && (
              <div className="mb-3">
                <h6 className="fw-bold">Uploaded Photo:</h6>
                <img
                  src={photoPreview}
                  className="rounded shadow"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
              </div>
            )}

            <button onClick={downloadReceipt} className="btn btn-success w-100 fw-bold mt-3">
              📥 Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Form UI
  return (
    <div className="d-flex flex-column text-light">
      <div className="container py-4">
        <div className="bg-light text-dark p-4 rounded shadow mx-auto" style={{ maxWidth: "550px" }}>
          <h2 className="text-warning text-center fw-bold mb-3">🎁 Reward Claim Verification</h2>
          <p className="text-center">
            Reward Number: <b>{rewardNumber}</b>
          </p>

          <form onSubmit={handleSubmit}>
            {[
              ["Full Name", "name"],
              ["Email", "email"],
              ["Phone", "phone"],
              ["Country", "country"],
              ["State", "state"],
              ["District", "district"],
              ["Pincode", "pincode"],
            ].map(([label, name]) => (
              <div className="mb-3" key={name}>
                <label className="form-label fw-bold">{label}</label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                />
                {errors[name] && <small className="text-danger">{errors[name]}</small>}
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label fw-bold">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
              ></textarea>
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Upload Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className={`form-control ${errors.photo ? "is-invalid" : ""}`}
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  width={120}
                  height={120}
                  className="mt-2 rounded"
                  alt="preview"
                />
              )}
              {errors.photo && <small className="text-danger">{errors.photo}</small>}
            </div>

            <button className="btn btn-warning w-100 fw-bold">Submit Verification</button>
          </form>
        </div>
      </div>
    </div>
  );
}
