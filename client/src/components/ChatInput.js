import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ChatInput = ({ clickedUser, getUserMessages, getClickedUserMessages }) => {
  const [textArea, setTextArea] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['Users']);
  const userId = cookies.UserId;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    }

    try {
      await axios.post('http://localhost:8000/message', { message });
      getUserMessages();
      getClickedUserMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="chat-input">
      <textarea value={textArea} onChange={(e) => {setTextArea(e.target.value)}}/>
      <button className="secondary-button" onClick={addMessage}>Submit</button>  
    </div>
  )
}

export default ChatInput;