import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/appContext";
import routes from "../data/routes";

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

export default function Login() {
    const { memberSet } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.value !== "") {
          setUsername(e.target.value);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        memberSet(username, randomColor());
        navigate(routes.chat);
    }
    
    return (
        <form className="login-container" onSubmit={onSubmit}>
            <label>USERNAME</label>
            <input
                spellCheck="false"
                type="text"
                className="login-input"
                onChange={onChange}
            />
            <label>COLOR</label>
            <input
                spellCheck="false"
                type="text"
                className="login-input"
                onChange={onChange}
            />
            <button 
                type="submit"
                className="login-button">
                    LOGIN
            </button>
        </form>
    );
}