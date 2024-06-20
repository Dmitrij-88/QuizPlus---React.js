import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/signin.css';

const SignIn = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        //sign-in logic here
    };

    return (
        <div className="login-container">
            <div className="title-signin">
                <center><h3>Sign In</h3></center>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div className="footer-links">
                <Link to="/signup">
                    <button className="signUpButton">Sign Up</button>
                </Link>
                <Link to="/forgotPassword">
                    <button className="forgotPasswordButton">Forgot password?</button>
                </Link>
            </div>
        </div>
    );
};

export default SignIn;