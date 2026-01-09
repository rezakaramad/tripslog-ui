const API_BASE = "http://app:8080/api/trips";

export async function getTrips({ q, year } = {}) {
    const params = new URLSearchParams();
    if (q) {
        params.append("q", q);
    }
    if (year) {
        params.append("year", year);
    }
    const url =
        params.toString().length > 0
            ? `${API_BASE}?${params.toString()}`
            : API_BASE;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch trips");
    }
    return res.json();
}

/* GET /api/trips/{id} */
export async function getTripById(id) {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) {
        throw new Error("Trip not found");
    }
    return res.json();
}

/* POST /api/trips */
export async function createTrip(trip) {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    });

    if (!res.ok) {
        throw new Error("Failed to create trip");
    }

    return res.json();
}
