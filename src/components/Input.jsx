import { useState } from "react";

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    if (text !== "") {
      onSendMessage(text);
    }
  }

  return (
    <form className="send-container" onSubmit={onSubmit}>
      <input
        type="text"
        className="message-input"
        spellCheck="false"
        value={text}
        onChange={onChange}
      />
      <button 
        type="submit"
        className="send-button">
          SEND
      </button>
    </form>
  );
}
