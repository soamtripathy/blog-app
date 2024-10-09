import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)

  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await fetch("https://blog-app-server-cyan.vercel.app/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then(userInfo => {
            setUserInfo(userInfo)
          setRedirect(true);
        })
      } else {
        const data = await response.json();
        console.error("Login failed", data);
        alert("Wrong Credintials")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginPage;
