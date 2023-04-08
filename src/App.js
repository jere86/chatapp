import { useState } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import './App.css';

function randomName() {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] + "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function App() {
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [messages, setMessages] = useState([]);
  const [drone] = useState(new window.Scaledrone("Lzqy8p3ryiReuF8Q", { data: member }));
  
  drone.on('open', error => {
    if (error) {return console.error(error);}
    const memberWithId = {...member, id: drone.clientId};
    setMember(memberWithId);
  });
  
  const room = drone.subscribe("observable-room");

  room.on('message', message => {
    const {data, member} = message;
    const time = Date.now();
    setMessages(messages => [...messages, {member, text: data, time}]);
  });

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message
    });
  };

  return (
    <div className="chat-container">
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
