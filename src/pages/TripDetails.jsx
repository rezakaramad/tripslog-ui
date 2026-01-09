import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatDate } from "../utils/date";
import { getTripById } from "../api/trips";

export default function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getTripById(id)
      .then((res) => {
        setTrip(res);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load trip details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="loading">Loading trip…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!trip) {
    return <p className="empty">Trip not found.</p>;
  }

  return (
    <div className="page">
      <div className="content">
        <div className="container">

          <div className="trip-details-card">

            {/* Header */}
            <header className="trip-header">
              <h1 className="trip-title">{trip.title}</h1>
              <p className="trip-dates">
                {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
              </p>
            </header>

            {/* Description */}
            {trip.description && (
              <section className="trip-section">
                <p className="trip-description">{trip.description}</p>
              </section>
            )}

            {/* Meta */}
            <div className="trip-meta">
              {trip.location && <span>{trip.location}</span>}
              <span>{trip.id}</span>
            </div>

            <div className="trip-meta">
              Created {formatDate(trip.createdAt)}
            </div>

            {/* Actions */}
            <footer className="trip-actions">
              <button className="btn-secondary">Edit</button>
              <button className="btn-danger">Delete</button>
            </footer>

          </div>

        </div>
      </div>
    </div>
  );
}
