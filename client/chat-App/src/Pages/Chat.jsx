import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChats from "../Chats/UserChats";
import { AuthContext } from "../Context/AuthContext";
import PotentialChats from "../Chats/PotentialChats"
import ChatBox from "../Chats/ChatBox"

const Chat = () => {
    const { user } = useContext(AuthContext);

    const { userChats,
        isUserChatsLoading,updateCurrentChat } = useContext(ChatContext);

        // console.log("userChats" , userChats);
    return (
        <Container>
        <PotentialChats/>
        {userChats?.length < 1?null : (
            <Stack direction="horizontal" gap={4} className="align-items-start mt-4 chat_container">
                <Stack className="message-box flex-grow-0" >
                {isUserChatsLoading && <p>loading...</p>}
                {userChats?.map((chat,index)=>{
                    return(
                        <div key={index} onClick={()=> updateCurrentChat(chat)}><UserChats chat={chat} user={user}/></div>
                    )
                })}
                </Stack>
                <ChatBox/>
            </Stack>
        )}
        Chats
    </Container>
        );
}

export default Chat;