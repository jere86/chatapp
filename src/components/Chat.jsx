import { useState, useContext } from 'react';
import { AppContext } from "../context/appContext";
import Input from './Input';
import Messages from './Messages';

export default function Chat() {
    const { member } = useContext(AppContext);

    const [drone] = useState(new window.Scaledrone("Lzqy8p3ryiReuF8Q", { data: member }));
    const [messages, setMessages] = useState([]);

    drone.on('open', error => {
        if (error) {return console.error(error)};
    });

    const room = drone.subscribe("observable-room");

    room.on('message', message => {
        const {data, member} = message;
        const time = Date.now();
        setMessages([...messages, {member, text: data, time}]);
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