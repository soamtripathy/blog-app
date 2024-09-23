import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <>
      <form className="login">
        <h1>Login</h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button>Login</button>
        <div className="otherwise">
          <p>
            If already registered{" "}
            <Link to="/register" className="alreadylogin">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
