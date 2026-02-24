import WorkoutItem from './WorkoutItem';

function WorkoutList({ workouts, updateWorkout, deleteWorkout }) {
  if (workouts.length === 0) {
    return <p>Geen workouts gevonden</p>;
  }

  return (
    <>
      {workouts.map(workout => (
        <WorkoutItem
          key={workout._id}
          workout={workout}
          updateWorkout={updateWorkout}
          deleteWorkout={deleteWorkout}
        />
      ))}
    </>
  );
}

export default WorkoutList;