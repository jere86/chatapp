export default function OnlineUsers({ onlineUsers, currentMember }) {
    return (
        <div className="online-users">
            {onlineUsers.filter(user => (user.clientData.id === currentMember.id)).map(user => {
                return (
                    <div 
                        className="user"
                        key={user.clientData.id}
                        style={{backgroundColor: user.clientData.color}}>
                            {user.clientData.username}
                    </div>
                )
            })}
            <div className="line"></div>
            {onlineUsers.filter(user => (user.clientData.id !== currentMember.id)).map(user => {
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
