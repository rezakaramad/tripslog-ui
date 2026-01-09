import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="nav-group">
                    <Link to="/" className="nav-brand">TripsLog</Link>

                    <span className="nav-separator"></span>

                    <Link to="/locations" className="nav-link">Locations</Link>
                    <Link to="/hotels" className="nav-link">Hotels</Link>
                    <Link to="/expenses" className="nav-link">Expenses</Link>
                </div>
            </div>
        </nav>
    );
}