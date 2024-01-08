import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../hooks/useFetchRecipients";
import avetar from "../assets/user.svg"
import "../App.css"
const UserChats = ({chat,user}) => {
    const {recipient} = useFetchRecipientUser(chat,user);

// return <>UserCHats</>
    return ( 
    <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between">
    <div className="d-flex">
    <div className="me-2">
        <img src={avetar} alt="" width="50px"/>
    </div>
    <div className="text-content">
        <div className="name">{recipient?.name}</div>
        <div className="text">Text Message....</div>
    </div>
    </div>
    <div className="d-flex flex-column align-items-end">
        <div className="date">
            12/12/2121
        </div>
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
    </div>
    </Stack>
        );
}
 
export default UserChats;