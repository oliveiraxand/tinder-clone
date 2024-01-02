import { useCookies } from "react-cookie";

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  console.log('user:', user.user.first_name);
  const logout = () => {
    removeCookie('UserId', cookies.UserId);
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload();
  }
  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.user.url} alt="pic user" />
        </div>
        <h3>{user.user.first_name}</h3>
      </div>
      <i className="log-out-icon" onClick={ logout }> ⟵ </i>
    </div>
  )
}

export default ChatHeader;