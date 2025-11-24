import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const Navigate = useNavigate();
  async function checkUser(username, password) {
    const response = await fetch(`http://localhost:3000/login/${username}`, {
      method: "POST",
      body: JSON.stringify({ password: password }),
      headers: { "Content-Type": "application/json" },
    });
    try {
      if (response.status === 200) {
        setLogin("");
        Navigate(`/${username}`);
      } else {
        setLogin("login failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <h2>Login</h2>
      <div className="div">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkUser(username, password);
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>{login}</p>
        <h4>New user?</h4>
        {/* <button onClick={() => navigate("/register")}>Register</button> */}
      </div>
    </>
  );
}

export default LoginPage;
