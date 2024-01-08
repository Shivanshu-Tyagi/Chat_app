import { createContext ,useState ,useEffect,useCallback} from "react";
import {baseUrl, getRequest , postRequest} from "../Utils/Service";

export const ChatContext = createContext();

export const ChatContextProvider = ({children , user}) =>{
    const [userChats , setUserChats ] = useState(null);
    const [isUserChatsLoading , setisUserChatsLoading ] = useState(null);
    const [userChatsError , setuserChatsError ] = useState(null);
    const [potentialChats,setPotentialChats] = useState([]);

    useEffect(() => {
     const getUsers = async() =>{
        const response = await getRequest(`${baseUrl}/users`);

        if (response.error) {
            return console.log("Error fetching users",response);
        }

      const pChats = response.filter((u)=>{
        let isChatCreated = false;
        if(user.loginId === u.loginId) return false;
        if(userChats){
            isChatCreated= userChats?.some((chat)=>{
                return chat.members[0] === u.loginId || chat.members[1] === u.loginId 
            })
        }
        return !isChatCreated;
        });
        setPotentialChats(pChats)
     }
     getUsers();
    }, [userChats])
    
    useEffect(() => {
      const getUserChats = async()=>{
        if(user?.loginId){
            setisUserChatsLoading(true);
            setuserChatsError(null);
            const response = await getRequest(`${baseUrl}/chats/${user?.loginId}`);

            setisUserChatsLoading(false)

            if(response.error){
                return setuserChatsError(response)
            }
            setUserChats(response)
            console.log("response" , response);
        }
      }; 
      getUserChats();
    }, [user])

    const createChat = useCallback(async(firstId,secoundId)=>{
        const response = await postRequest(`${baseUrl}/chats` , JSON.stringify({
            firstId,
            secoundId
        }));
        if(!response.error){
            return console.log("Error creating chat",response);
        }
        setUserChats((prev) => [...prev,response]);

    },[]);
    
    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat
    }}>
        {children}
    </ChatContext.Provider>
}

// ++++++++++++++++++++++++++++++++++++Chats++++++++++++++++++++++++++

import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChats from "../Chats/UserChats";
import { AuthContext } from "../Context/AuthContext";
import PotentialChats from "../Chats/PotentialChats";

const Chat = () => {
    const { user } = useContext(AuthContext);

    const { userChats,
        isUserChatsLoading,
        userChatsError } = useContext(ChatContext);

        console.log("userChats" , userChats);
    return (
        <Container>
        <PotentialChats/>
        {userChats?.length < 1?null : (
            <Stack direction="horizontal" gap={4} className="align-items-start mt-4">
                <Stack className="message-box flex-grow-0" >
                {isUserChatsLoading && <p>loading...</p>}
                {userChats?.map((chat,index)=>{
                    return(
                        <div key={index}><UserChats chat={chat} user={user}/></div>
                    )
                })}
                </Stack>
                <p>chatbox</p>
            </Stack>
        )}
    </Container>
        );
}

export default Chat;