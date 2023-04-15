import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import Input from "./Input";
import Messages from "./Messages";
import routes from "../data/routes";

export default function Chat() {
    const { member, setMember, drone } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();
    
    const room = drone.subscribe("observable-room");

    room.on("message", message => {
        const { data, member, timestamp } = message;
        setMessages([...messages, {member, text: data, timestamp}]);
    });

    const onSendMessage = (message) => {
        drone.publish({
            room: "observable-room",
            message
        });
    };

    const logOut = () => {
        navigate(routes.login);
        setMember({});
    }

    return (
        <div className="chat-container">
            <div className="logout" onClick={logOut}>X</div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
}
