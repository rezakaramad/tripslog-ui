import { useEffect, useState } from "react";
import { getTrips } from "../api/trips";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatDate } from "../utils/date";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();

    const [trips, setTrips] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getTrips(query)
            .then(data => {
                setTrips(data);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load trips");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [query]);

    return (
        <div className="page">
            <div style={{ zIndex: 2000 }}>
                <Navbar />
            </div>

            <main className="content">
                <div className="container">

                    <form
                        className="search-bar"
                        onSubmit={e => e.preventDefault()}
                    >
                        <input
                            type="text"
                            placeholder="Search trips…"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                    </form>

                    <div className="trip-grid">

                        {loading && (
                            <div className="loading">Loading trips…</div>
                        )}

                        {!loading && error && (
                            <div className="error">{error}</div>
                        )}

                        {!loading && !error && trips.length === 0 && (
                            <div className="empty">No trips found</div>
                        )}

                        {!loading && !error && trips.map(trip => (
                            <Link
                                key={trip.id}
                                to={`/trips/${trip.id}`}
                                state={{ backgroundLocation: location }}
                                className="trip-card"
                            >
                                <div className="card-title">
                                    {trip.title}
                                </div>

                                <div className="card-dates">
                                    {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                                </div>

                                <div className="card-meta">
                                    Created {formatDate(trip.createdAt)}
                                </div>

                                <div className="card-id">
                                    <code className="id">{trip.id}</code>
                                </div>
                            </Link>
                        ))}

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
