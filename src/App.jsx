import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import CreateTripPage from "./pages/CreateTripPage";
import Modal from "./components/Modal";

export default function App() {
  const navigate = useNavigate();

  return (
    <>
      {/* Home is ALWAYS visible */}
      <Home />

      {/* Normal page route */}
      <Routes>
        <Route path="/create" element={<CreateTripPage />} />
      </Routes>

      {/* Modal route */}
      <Routes>
        <Route
          path="/trips/:id"
          element={
            <Modal onClose={() => navigate("/")}>
              <TripDetails />
            </Modal>
          }
        />
      </Routes>
    </>
  );
}
