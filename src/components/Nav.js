import tinder from "../images/logotinder.png"
import tinderwhite from "../images/logotinderwhite.png"

const Nav = ({ minimal, authToken }) => {

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={ minimal ? tinder : tinderwhite } alt="logo"/>
      </div>

      {!authToken && !minimal && <button className="nav-button">Log in</button> }
    </nav>
  )
}

export default Nav;