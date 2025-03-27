import { Routes, Route, Link } from "react-router-dom";
import DeleteAccount from "./pages/DeleteAccount";
import "./App.css"; // Ensure you have CSS for styling

function App() {
  return (
    <>
      {/* Navigation Bar (Only Delete Account Link) */}
      {/* <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            FreshDrop
          </Link>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="active">
                Delete Account
              </Link>
            </li>            
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav> */}

      {/* Page Content */}
      <div className="content">
        <Routes>
          {/* Delete Account Page as the only route */}
          <Route path="/" element={<DeleteAccount />} />

          {/* Commented Out Other Routes */}
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
