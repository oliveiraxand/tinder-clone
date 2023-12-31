import tinder from "../images/logotinder.png"
import tinderwhite from "../images/logotinderwhite.png"

const Nav = ({ minimal, authToken, setShowModel, showModel, setIsSignUp }) => {

  const handleClick = () => {
    setShowModel(true);
    setIsSignUp(false);
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={ minimal ? tinder : tinderwhite } alt="logo"/>
      </div>

      {!authToken && !minimal && <button
          className="nav-button"
          onClick={ handleClick }
          disabled={ showModel }
        >Sig in</button> }
    </nav>
  )
}

export default Nav;