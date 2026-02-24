import { useState } from 'react';

function WorkoutForm({ addWorkout }) {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    addWorkout({
      title,
      reps: Number(reps),
      load: Number(load)
    });

    setTitle('');
    setReps('');
    setLoad('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        type="number"
        placeholder="Load (kg)"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />
      <button type="submit">Toevoegen</button>
    </form>
  );
}

export default WorkoutForm;