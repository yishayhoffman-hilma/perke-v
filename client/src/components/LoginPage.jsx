import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function chekUser(username, password) {
    const response = await fetch(
      `http://localhost:3000/users/`,
      { method: "POST" }
    );
    try {
      const jsondata = await response.text();
      console.log(jsondata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <h2>Login</h2>
      <div className="div">
        <form onSubmit={chekUser}>
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
        <h4>New user?</h4>
        {/* <button onClick={() => navigate("/register")}>Register</button> */}
      </div>
    </>
  );
}

export default LoginPage;
