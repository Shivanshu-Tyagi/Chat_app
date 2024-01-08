import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../Utils/Service";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setisUserChatsLoading] = useState(false);
    const [userChatsError, setuserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setmessages] = useState(null);
    const [isMessagesLoading, setMessagesLoading] = useState(false);
    const [messageError, setmessageError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setsocket] = useState(null)
    const [onlineUser,setOnlineUser] = useState([]);


    console.log("onlineUser", onlineUser);

    // +++++++++++++++++Initilize Socket.IO++++++++++++++++++

    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setsocket(newSocket);

        return () =>{
            newSocket.disconnect()
        }
    }, [user]);

    useEffect(() => {
        if (socket === null) return;
      socket.emit("addNewUser" , user?.loginId);
      socket.on("getOnlineUsers",(res) => {
        setOnlineUser(res);
      })
    },[socket]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response && response.error) {
                return console.log("Error fetching users", response);
            }
            // console.log("loginid==========", user.loginId);
            const pChats = response.filter((U) => {
                let isChatCreated = false;
                if (user?.loginId === U.loginId) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat && (chat.members[0] === U.loginId || chat.members[1] === U.loginId);
                    });

                }
                return !isChatCreated;
            });
            setPotentialChats(pChats)
        }
        getUsers();
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.loginId) {
                setisUserChatsLoading(true);
                setuserChatsError(null);
                const response = await getRequest(`${baseUrl}/chats/${user?.loginId}`);

                setisUserChatsLoading(false)

                if (response.error) {
                    return setuserChatsError(response)
                }
                setUserChats(response)

            }
        };
        getUserChats();
    }, [user])

    useEffect(() => {
        const getMessages = async () => {
            setMessagesLoading(true);
            setmessageError(null);
            const response = await getRequest(`${baseUrl}/message/${currentChat?.chatId}`);

            setMessagesLoading(false)

            if (response.error) {
                return setmessageError(response)
            }
            setmessages(response)

        };
        getMessages();
    }, [currentChat])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("you must type something...");

        const response = await postRequest(`${baseUrl}/message`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender.loginId,
            text: textMessage,
        })
        );
        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response)
        setmessages((prev) => [...prev, response])
        setTextMessage('');

    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, [])

    const createChat = useCallback(async (firstId, secoundId) => {
        try {
            // Step 1: Create the chat and update the local state
            const newChat = {
                members: [firstId, secoundId],
                // You can add other chat properties as needed
            };

            setUserChats((prev) => (prev ? [...prev, newChat] : [newChat]));

            // Step 2: Call the API to create the chat on the server
            await postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secoundId }));

            // Step 3: Retrieve the updated userChats from the server
            const updatedUserChats = await getRequest(`${baseUrl}/chats/${user?.loginId}`);
            if (!updatedUserChats.error) {
                // Update the userChats state with the updated chats
                setUserChats(updatedUserChats);
            }
        } catch (error) {
            console.log("Error creating chat", error);
        }
    });


    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        currentChat,
        messages,
        isMessagesLoading,
        messageError,
        sendTextMessage,
        onlineUser
    }}>
        {children}
    </ChatContext.Provider>
}