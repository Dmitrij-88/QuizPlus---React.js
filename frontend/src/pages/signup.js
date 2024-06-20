import { useState } from 'react';
import { useSignup } from "../hooks/useSignup"
import '../Styles/signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    fname: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Custom hook 'useSignup' to handle signup functionality
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation: Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Call the 'signup' function from the 'useSignup' hook
    await signup(formData.fname, formData.surname, formData.email, formData.password)
  }

  return (
    <div className="register-container">
      <div className='title-signup'>
        <center><h1>Register</h1></center>
      </div>
      <form onSubmit={handleSubmit} className='register'>

        <div className="input-group">
          <div className='text'>
            <label>First Name:</label>
          </div>
          <input
            type="text"
            value={formData.fname}
            onChange={(e) => setFormData(prev => ({ ...prev, fname: e.target.value }))}
          />
        </div>

        <div className="input-group">
          <label>Surname:</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData(prev => ({ ...prev, surname: e.target.value }))}
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>

        {/* Button to submit the signup form */}
        <button disabled={isLoading}>Register</button>

         {/* Display the error message if there is an error */}
         {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default Signup
