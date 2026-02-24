import { useEffect, useState } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

function App() {
  const [workouts, setWorkouts] = useState([]);

  // READ
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  // CREATE
  const addWorkout = async (workout) => {
    try {
      const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
      });

      const data = await response.json();

      if (response.ok) {
        setWorkouts([data, ...workouts]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE (PATCH)
  const updateWorkout = async (id, updatedWorkout) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedWorkout)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWorkouts(
          workouts.map(w =>
            w._id === id ? data : w
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE
  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/workouts/${id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setWorkouts(workouts.filter(w => w._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Workouts</h1>

      <WorkoutForm addWorkout={addWorkout} />

      <WorkoutList
        workouts={workouts}
        updateWorkout={updateWorkout}
        deleteWorkout={deleteWorkout}
      />
    </div>
  );
}

export default App;