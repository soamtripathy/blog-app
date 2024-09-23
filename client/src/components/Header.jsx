import logoImage from "../../public/morsamiya.jpg";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img src={logoImage} />
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
