import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import '../Styles/componentStyles.css';
import '../Styles/signin.css';

const Navbar = () => {
  const location = useLocation();
  const homepage = location.pathname === '/';
  const signInPage = location.pathname === '/signin'
  const signUpPage = location.pathname === '/signup'

  return (
    <header>
      <div className="Navbar_container">
      <h1>QuizPlus+</h1>
        <nav>
          {!homepage && (
            <Link to="/">
              <button>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </button>
            </Link>
          )}
          {!signInPage && !signUpPage && (
            <Link to="/signin">
              <button className="signInLink">Sign In</button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;