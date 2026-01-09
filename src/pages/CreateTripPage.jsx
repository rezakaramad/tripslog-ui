import { useState } from "react";
import { createTrip } from "../api/trips";

export default function CreateTripPage() {
    const [title, setTitle] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await createTrip({
            title,
            startDate: "2025-06-01",
            endDate: "2025-06-10"
        });

        alert("Trip created!");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Trip title"
            />
            <button type="submit">Create</button>
        </form>
    );
}
