import { useState } from 'react';

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      onSendMessage(text);
    }
    setText("");
  }

  return (
    <form className="send-container" onSubmit={onSubmit}>
      <input
        type="text"
        className="message-input"
        value={text}
        onChange={onChange}
      />
      <button 
        type="submit"
        className="send-button">
          Send
      </button>
    </form>
  );
}
