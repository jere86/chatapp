import uuid from "react-uuid";

export default function Messages({messages, currentMember}) {
  
  const formatTime = (time) => {
    return new Intl.DateTimeFormat('hr-HR', 
    {hour: '2-digit', minute: '2-digit'}).format(new Date(time));
  }
  
  const renderMessage = (message) => {
    const {member, text, time} = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "my" : "others";

    return (
      <div className={`${className}-messages`} key={uuid()}>
        <div className="message">
          <div className={`${className}-username`} style={{color: member.clientData.color}}>
            {member.clientData.username}
          </div>
          <div className={`${className}-text`}>
            <div className="text">
              {text}
            </div>
            <div className="time">
              {formatTime(time)}
            </div>
          </div>
        </div>
        <div 
          className="avatar"
          style={{backgroundColor: member.clientData.color}}>
            {member.clientData.username.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className="message-container">
      {messages.map(message => renderMessage(message))}
      <div className="anchor"></div>
    </div>
  );
}
