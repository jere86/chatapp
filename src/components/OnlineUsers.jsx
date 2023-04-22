export default function OnlineUsers({ onlineUsers, currentMember }) {
    return (
        <div className="online-users">
            {onlineUsers.map(user => {
                if (user.clientData.id === currentMember.id) {
                    return (
                        <div 
                            className="user"
                            key={user.clientData.id}
                            style={{backgroundColor: user.clientData.color}}>
                                {user.clientData.username}
                        </div>
                    )
                }
            })}
            <h2> </h2>
            {onlineUsers.map(user => {
                if (user.clientData.id !== currentMember.id) {
                    return (
                        <div 
                            className="user"
                            key={user.clientData.id}
                            style={{backgroundColor: user.clientData.color}}>
                                {user.clientData.username}
                        </div>
                    )
                }
            })}
        </div>
    )
}
