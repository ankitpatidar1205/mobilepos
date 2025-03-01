import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { showErrorToast, showSuccessToast } from '../utils/toastUtils';
import { showErrorAlert } from '../utils/alertUtils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); 
// console.log("formadata", credentials)
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(loginUser(credentials))
    .unwrap()
    .then((data) => {
      // On successful login
      showSuccessToast(data.message || 'Login successful!');
      navigate('/dashboard'); 
    })
    .catch((err) => {
      console.log("login page errror",err)
      showErrorToast(err || 'Login failed!');
      showErrorAlert(err || 'Login failed!');
    });
};


const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
  return (
    <div className="container d-flex">
      {/* Left Section */}
      {error && <p>{error}</p>}
      <div className="row w-100 align-items-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center mt-4 mb-4 loginimage">
          <div
            className="left-section"
            style={{ height: 700, backgroundColor: "#f8f7fa", width: "100%" }}
          >
            <div className="illustration">
              <img
                src="https://i.ibb.co/M7pyvrh/9646421.webp"
                alt={9646421}
                className="img-fluid my-5 auth-illustration px-5"
                data-app-light-img="illustrations/auth-register-illustration-light.png"
                data-app-dark-img="illustrations/auth-register-illustration-dark.png"
                height="500px"
                width="100%"
              />
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="col-md-6 col-12 right-section">
          <div className="login-form">
            <div className="mb-4">
              {/* <img src="https://via.placeholder.com/100" alt="Logo" class="mb-3"> */}
              <h4>Login</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name='email'
                  placeholder="Username"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}  // Toggle password visibility
                  className="form-control position-relative"
                  name="password"
                  placeholder="*******"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
                {/* Password toggle icon */}
                <button
  type="button"
  className="btn btn-light position-absolute end-0 !top-1/2 translate-middle-y " style={{marginTop: "-20px"}}
  onClick={togglePasswordVisibility}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>

              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="privacy-policy"
                  required=""
                />
                <label className="form-check-label" htmlFor="privacy-policy">
                  I agree to <a href="#">privacy policy &amp; terms</a>
                </label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
