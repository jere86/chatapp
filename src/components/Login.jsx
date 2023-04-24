import { useState, useContext } from "react";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { CirclePicker } from "react-color";
import routes from "../data/routes";

export default function Login() {
    const { setMember, drone } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [color, setColor] = useState("");
    const navigate = useNavigate();

    const usernameSet = (e) => {
        setUsername(e.target.value);
    }

    const colorSet = (e) => {
        setColor(e.hex);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (username === "") {
            alert("USERNAME!!!");
            return
        } else if (color === "") {
            alert("COLOR!!!");
            return
        }
        setMember({username: username, color: color, id:drone.clientId});
        navigate(routes.chat);
    }
    
    return (
        <form className="login-container" onSubmit={onSubmit}>
            <label>USERNAME</label>
            <input
                spellCheck="false"
                type="text"
                className="login-input"
                onChange={usernameSet}
                maxLength={15}
            />
            <label>COLOR</label>
            <CirclePicker onChange={colorSet}/>
            <button 
                type="submit"
                className="login-button">
                    LOGIN
            </button>
        </form>
    );
}
