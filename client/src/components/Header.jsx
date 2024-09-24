import { useContext, useEffect, useState } from "react";
import logoImage from "../../public/morsamiya.jpg";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:8000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img src={logoImage} />
        </Link>
        <nav>
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
