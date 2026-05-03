import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [data, setData] = useState(null);

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (res.status === 200 && result.access) {
      setToken(result.access);
      alert("Login successful!");
    } else {
      alert("Invalid username or password");
    }
  };

  const getItems = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/items/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const result = await res.json();
    setData(result);
  };

  return (
    <div className="container">
      <h2 className="title">Login</h2>

      <input
        className="input"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="button" onClick={login}>
        Login
      </button>

      <div className="section">
        <h3>Items</h3>
        <button className="button" onClick={getItems}>
          Get Items
        </button>
      </div>

      <pre className="output">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default App;