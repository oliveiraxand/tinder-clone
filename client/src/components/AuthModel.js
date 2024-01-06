import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModel = ({ setShowModel, isSignUp }) => {
  const handleClick = () => {
    setShowModel(false);
    // setIsSignUp(true);
  }

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && (password !== confirmPassword)) {
        setError("Passwords need to match!")
        return
      }
      const response = await axios.post(`http://localhost:8000/${ isSignUp ? 'signup' : 'login' }`, {email, password})
      console.log(response);
      // setCookie('Email', response.data.email);
      setCookie('UserId', response.data.userId);
      setCookie('AuthToken', response.data.token);

      const success = response.status === 201
      console.log(response.status);
      // console.log('chegou', success, response);
      if(success && isSignUp) { navigate('/onboarding')}
      if(success && !isSignUp) navigate('/dashboard')

      window.location.reload();

    } catch(error) {
      console.log(error);
    }
  }

  // console.log(email, password, confirmPassword)
  
  return (
    <div className="auth-model">
      <div className="close-icon"onClick={ handleClick }> X </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
      <p>By clicking {isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy</p>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="confirm-password"
          required={true}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />}
        <input className="secondary-button" type="submit" value={isSignUp ? 'CREATE ACCOUNT': 'LOG IN'} />
        <p>{error}</p>
      </form>
      <hr />
      GET THE APP
    </div>
  )
}

export default AuthModel;