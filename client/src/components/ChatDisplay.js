import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const [userMessages, setUserMessages] = useState([]);
  const [clickedUserMessages, setClickedUserMessages] = useState([]);
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const getMessages = async (userId, correspondingUserId) => {
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId, correspondingUserId }
      });
      // console.log(response)
      return response.data;
    } catch (e) {
      console.error('Erro:', e);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setUserMessages(await getMessages(userId, clickedUserId));
      setClickedUserMessages(await getMessages(clickedUserId, userId));
    }

    fetchData();
  }, [userId, clickedUserId]);

  const messages = userMessages.map(message => ({
    name: user?.first_name,
    img: user?.url,
    message: message.message,
    timestamp: message.timestamp
  }));

  const clickedUserMessage = clickedUserMessages.map(message => ({
    name: user?.first_name,
    img: user?.url,
    message: message.message,
    timestamp: message.timestamp
  }));

  const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  
  return (
    <div className="">
      <Chat descendingOrderMessages={descendingOrderMessages}/>
      <ChatInput />
    </div>
  )
}

export default ChatDisplay;
