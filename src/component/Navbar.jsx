// // import React from "react";
// // // import "./Navbar.css";

// // export default function Navbar() {
// //   return (
// //     <nav className="navbar navbar-dark bg-dark px-5 py-3 border-bottom border-secondary">
// //       <div className="d-flex justify-content-between align-items-center w-100">
// //         <h3 className="text-warning fw-bold mb-0">GOLDEN COMMANDO</h3>
// //         <ul className="nav">
// //           <li className="nav-item"><a href="#" className="nav-link text-light">Welcome</a></li>
// //           <li className="nav-item"><a href="#" className="nav-link text-light">About</a></li>
// //           <li className="nav-item"><a href="#" className="nav-link text-light">Terms & Policy</a></li>
// //           <li className="nav-item"><a href="#" className="nav-link text-light">Contact Us</a></li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // }
// import React, { useState } from "react";
// // import "./Navbar.css";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-4 border-bottom border-secondary">
//       <div className="container-fluid">
//         <a className="navbar-brand text-warning fw-bold" href="#">
//           GOLDEN COMMANDO
//         </a>

//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
//           <ul className="navbar-nav ms-auto text-center">
//             <li className="nav-item">
//               <a className="nav-link text-light" href="#">
//                 Welcome
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-light" href="#">
//                 About
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-light" href="#">
//                 Terms & Policy
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-light" href="#">
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark py-3 px-4 border-bottom border-secondary">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left side - Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/pic/logo.png" // 🔹 Replace this with your logo path
            alt="Logo"
            width="55"
            height="55"
            className="d-inline-block align-text-top rounded-circle"
          />
        </a>

        {/* Right side - Name */}
        <span className="navbar-text text-warning fw-bold fs-5">
          GOLDEN COMMANDO
        </span>
      </div>
    </nav>
  );
}
