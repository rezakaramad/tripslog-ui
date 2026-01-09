import { Link, useLocation } from "react-router-dom";

export default function TripCard({ trip }) {
  const location = useLocation();

  return (
    <Link
      to={`/trips/${trip.id}`}
      state={{ backgroundLocation: location }}
      className="trip-card"
    >
      <div className="card-title">{trip.title}</div>
      <div className="card-dates">
        {trip.startDate} – {trip.endDate}
      </div>
    </Link>
  );
}
