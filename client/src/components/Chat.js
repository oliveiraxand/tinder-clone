const Chat = ({ descendingOrderMessages }) => {
  return (
    <>
      <div className="chat-display">
        {descendingOrderMessages.map((message, _index) => (
          <div key={_index}>
            <div className="chat-message-header" key={_index}>
              <div className="img-container">
                <img src={message.img} alt={ message.first_name } />
              </div>
              <p>{message.name}</p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Chat;