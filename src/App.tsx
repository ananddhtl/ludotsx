import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import useScreen from "./hooks/useScreen";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartingScreen from "./screens/StartingScreen";
import { Screen } from "./types";

const App = () => {
  const screenType = useScreen();
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    phone: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("userId"); // Pass the encoded ID directly to the backend
  };

  const fetchUserDetails = async (encodedUserId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user`, {
        params: { userId: encodedUserId },
      });
      setUserDetails(response.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromURL();
    if (userId) {
      fetchUserDetails(userId);
    } else {
      setLoading(false); // No userId, stop loading
    }
  }, []);

  let screen;
  switch (screenType) {
    case Screen.GAME:
      screen = <GameScreen />;
      break;
    case Screen.STARTING:
      screen = <StartingScreen />;
      break;
    case Screen.GAME_OVER:
      screen = <GameOverScreen />;
      break;
    default:
      screen = null;
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : userDetails ? (
        <div className="user-details p-4 bg-white rounded shadow">
          <h2 className="text-lg font-bold">User Details</h2>
          <p>
            <strong>Name:</strong> {userDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {userDetails.phone}
          </p>
          <p>
            <strong>Role:</strong> {userDetails.role}
          </p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
      {screen}
    </div>
  );
};

export default App;
