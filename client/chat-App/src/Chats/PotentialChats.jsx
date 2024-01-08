import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { AuthContext } from "../Context/AuthContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUser } = useContext(ChatContext);
    console.log("PotentialChats", potentialChats);
    return (<>
        <div className="all-users">
            {potentialChats && potentialChats.map((u, index) => {
                return (
                    <div className="single-user" key={index} onClick={() => {
                        console.log("user.loginId", user.loginId);
                        console.log("u.loginId", u.loginId);
                        console.log("u.name", u.name);
                        createChat(user.loginId, u.loginId);
                    }}>
                        {u.name}
                        <span className={onlineUser?.some((user) => user?.userId === u?.loginId) ? "user-online" : ""}>

                        </span>
                    </div>
                );
            })}
        </div>
    </>);
}

export default PotentialChats;