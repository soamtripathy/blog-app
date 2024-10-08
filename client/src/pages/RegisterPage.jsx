import { useState } from "react";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("https://blog-app-server-cyan.vercel.app/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if(response.status === 200){
      alert("Registration Successfull")
    }
    else{
      "Registration Failed "
    }
    
  }
  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
        <div className="otherwise">
          <p>
            If already registered{" "}
            <Link to="/login" className="alreadyregister">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
