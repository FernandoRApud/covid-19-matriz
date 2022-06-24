import { Link } from "react-router-dom";
import "./style.css"

function NavigationBar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="brand">Covid-19</div>
        <div className="collapse">
          <div className="navbar-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
