import React from "react";

export default function Messages(props) {
  const {messages, currentMember} = props;

  const renderMessage = (message) => {
    const {member, text} = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ? "my" : "others";

    return (
      <div className={`${className}-messages`}>
        <div className={className}>
          <div className="username" style={{color: member.clientData.color}}>
            {member.clientData.username}
          </div>
          <div className={`${className}-text`}>
            {text}
          </div>
        </div>
        <div 
          className="avatar"
          style={{backgroundColor: member.clientData.color}}>
        </div>
      </div>
    );
  }

  return (
    <div className="message-container">
      {messages.map(message => renderMessage(message))}
    </div>
  );
}
