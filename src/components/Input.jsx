import { useState } from "react";
import InputEmoji from "react-input-emoji";

export default function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    if (text !== "") {
      onSendMessage(text);
    }
    setText("");
  }

  return (
    <form className="send-container" onSubmit={onSubmit} spellCheck="false">
      <InputEmoji
          value={text}
          onChange={setText}
          onEnter={onSubmit}
          placeholder=""
        />
      <button 
        type="button"
        className="send-button"
        onClick={onSubmit}>
          SEND
      </button>
    </form>
  );
}
