import { useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { username, password });
      login(res.data.token, res.data.username); // Save token
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        className="input input-bordered w-full mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input input-bordered w-full mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-full" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
