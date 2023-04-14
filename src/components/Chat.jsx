import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/appContext";
import Input from './Input';
import Messages from './Messages';
import routes from "../data/routes";

export default function Chat() {
    const { member, memberSet } = useContext(AppContext);
    const [drone] = useState(new window.Scaledrone("Lzqy8p3ryiReuF8Q", { data: member }));
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    drone.on('open', error => {
        if (error) {return console.error(error)};
        memberSet(member.username, member.color, drone.clientId);
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

    const logOut = () => {
        navigate(routes.login);
        memberSet();
    }

    return (
        <div className="chat-container">
            <div className="logout" onClick={logOut}>X</div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
}
