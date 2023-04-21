export default function OnlineUsers({ onlineUsers }) {
    return (
        <div className="online-users">
            <h2>Online users</h2>
            {onlineUsers.map(user => {
                return (
                    <div 
                        className="user"
                        key={user.clientData.id}
                        style={{backgroundColor: user.clientData.color}}>
                            {user.clientData.username}
                    </div>
                )
            })}
        </div>
    )
}
