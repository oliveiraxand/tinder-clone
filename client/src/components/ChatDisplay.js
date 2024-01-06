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

  const getUsersMessages = async () => {
    try {
           const response = await axios.get('http://localhost:8000/messages', {
               params: { userId: userId, correspondingUserId: clickedUserId}
           })
           setUserMessages(response.data)
       } catch (error) {
        console.log(error)
    }
   }

   const getClickedUsersMessages = async () => {
       try {
           const response = await axios.get('http://localhost:8000/messages', {
               params: { userId: clickedUserId , correspondingUserId: userId}
           })
           setClickedUserMessages(response.data)
       } catch (error) {
           console.log(error)
       }
   }

   useEffect(() => {
       getUsersMessages()
       getClickedUsersMessages()
   }, [])
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

  console.log(userMessages, clickedUserMessages);

  const descendingOrderMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  
  return (
    <div className="">
      <Chat descendingOrderMessages={descendingOrderMessages}/>
      <ChatInput
        clickedUser={clickedUser}
        getUserMessages={getUsersMessages}
        getClickedUserMessages={getClickedUsersMessages}
      />
    </div>
  )
}

export default ChatDisplay;
