function DeleteWorkout({ id, deleteWorkout }) {
  const handleDelete = () => {
    if (window.confirm('Weet je het zeker?')) {
      deleteWorkout(id);
    }
  };

  return (
    <button onClick={handleDelete}>
      Verwijderen
    </button>
  );
}

export default DeleteWorkout;