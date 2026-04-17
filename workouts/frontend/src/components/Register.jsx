import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error);
    }
  };

  return (
    <div>
      <h2>Registreren</h2>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Wachtwoord (min. 6 tekens)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Account aanmaken</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p>Al een account? <Link to="/login">Inloggen</Link></p>
    </div>
  );
}

export default Register;