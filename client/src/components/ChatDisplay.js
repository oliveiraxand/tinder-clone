import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";

const ChatDisplay = ({ user, clickedUser }) => {
  const [userMessages, setUserMessages] = useState([]);
  const [clickedUserMessages, setClickedUserMessages] = useState([]);
  const userId = user?.user.user_id;
  const clickedUserId = clickedUser?.user_id;
  // console.log(userId);

  const getMessages = async (userId, correspondingUserId) => {
    // console.log('CORRESPONDING', correspondingUserId)
    try {
      const response = await axios.get('http://localhost:8000/messages', {
        params: { userId, correspondingUserId }
      });
      console.log(response.data)
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

  const messages = []
    userMessages?.forEach(message => {
      const formattedMessage = {}
      formattedMessage['name'] = user?.user.first_name
      formattedMessage['img'] = user?.user.url
      formattedMessage['message'] = message.message
      formattedMessage['timestamp'] = message.timestamp
      messages.push(formattedMessage)
    })

  clickedUserMessages?.forEach(message => {
    const formattedMessage = {}
    formattedMessage['name'] = clickedUser?.first_name
    formattedMessage['img'] = clickedUser?.url
    formattedMessage['message'] = message.message
    formattedMessage['timestamp'] = message.timestamp
    messages.push(formattedMessage)
  })

  const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  
  return (
    <div className="">
      <Chat descendingOrderMessages={descendingOrderMessages}/>
      <ChatInput />
    </div>
  )
}

export default ChatDisplay;
