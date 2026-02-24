import UpdateWorkout from './UpdateWorkout';
import DeleteWorkout from './DeleteWorkout';

function WorkoutItem({ workout, updateWorkout, deleteWorkout }) {
  return (
    <div>
      <h3>{workout.title}</h3>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load} kg</p>

      <UpdateWorkout workout={workout} updateWorkout={updateWorkout} />
      <DeleteWorkout id={workout._id} deleteWorkout={deleteWorkout} />
    </div>
  );
}

export default WorkoutItem;