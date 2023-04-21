import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import Input from "./Input";
import Messages from "./Messages";
import OnlineUsers from "./OnlineUsers";
import routes from "../data/routes";

export default function Chat() {
    const { member, setMember, drone } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const navigate = useNavigate();
    
    const room = drone.subscribe("observable-room");

    room.on("message", message => {
        const { data, member, timestamp } = message;
        setMessages([...messages, {member, text: data, timestamp}]);
    });

    useEffect(() => {
        room.on('members', function(members) {
            setOnlineUsers(members);
        });
    }, [messages]);

    const onSendMessage = (message) => {
        drone.publish({
            room: "observable-room",
            message
        });
    };

    const logOut = () => {
        setMember({});
        navigate(routes.login);
        window.location.reload(true);
    }

    return (
        <div className="chat-container">
            <div className="logout" onClick={logOut}>X</div>
            <OnlineUsers onlineUsers={onlineUsers} />
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
}
