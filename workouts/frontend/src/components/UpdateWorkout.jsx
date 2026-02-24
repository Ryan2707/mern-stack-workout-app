import { useState } from 'react';

function UpdateWorkout({ workout, updateWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);

  const handleUpdate = () => {
    updateWorkout(workout._id, {
      title,
      reps: Number(reps),
      load: Number(load)
    });

    setIsEditing(false);
  };

  if (!isEditing) {
    return <button onClick={() => setIsEditing(true)}>Bewerken</button>;
  }

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={reps} onChange={(e) => setReps(e.target.value)} />
      <input value={load} onChange={(e) => setLoad(e.target.value)} />
      <button onClick={handleUpdate}>Opslaan</button>
    </div>
  );
}

export default UpdateWorkout;