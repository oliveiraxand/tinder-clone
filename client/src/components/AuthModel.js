import { useState } from "react";

const AuthModel = ({ setShowModel, isSignUp }) => {
  const handleClick = () => {
    setShowModel(false);
    // setIsSignUp(true);
  }

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp && (password !== confirmPassword)) {
        setError("Passwords need to match!")
      }
      console.log('make a post request to our database')
    } catch(error) {
      console.log(error);
    }
  }

  console.log(email, password, confirmPassword)
  
  return (
    <div className="auth-model">
      <div className="close-icon"onClick={ handleClick }> X </div>
      <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
      <p>By clicking Login, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy</p>
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
        <input className="secondary-button" type="submit"  />
        <p>{error}</p>
      </form>
      <hr />
      GET THE APP
    </div>
  )
}

export default AuthModel;