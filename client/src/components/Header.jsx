import { useContext, useEffect } from "react";
import logoImage from "../../public/morsamiya.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import DarkMode from "./DarkMode.jsx";
const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("https://blog-app-server-cyan.vercel.app/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("https://blog-app-server-cyan.vercel.app/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img src={logoImage} />
        </Link>
        <nav>
          <DarkMode />

          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a onClick={logout} href="#">
                Logout ({username})
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
