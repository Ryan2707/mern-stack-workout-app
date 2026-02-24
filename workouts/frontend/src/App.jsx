import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutList from "./components/WorkoutList";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

//Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

//Home component
function Home() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // GET workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      } else {
        console.error(data.error);
      }
    };

    fetchWorkouts();
  }, [token]);

  // CREATE workout
  const addWorkout = async (workout) => {
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workout),
    });

    const data = await response.json();

    if (response.ok) {
      setWorkouts([data, ...workouts]);
    }
  };

  // DELETE workout
  const deleteWorkout = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setWorkouts(workouts.filter((w) => w._id !== id));
    }
  };

  // UPDATE workout
  const updateWorkout = async (id, updatedWorkout) => {
    const response = await fetch(
      `http://localhost:4000/api/workouts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedWorkout),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setWorkouts(
        workouts.map((w) => (w._id === id ? data : w))
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="App">
      <h1>Workouts</h1>
      <button onClick={handleLogout}>Logout</button>

      <WorkoutForm addWorkout={addWorkout} />

      <WorkoutList
        workouts={workouts}
        deleteWorkout={deleteWorkout}
        updateWorkout={updateWorkout}
      />
    </div>
  );
}

export default App;