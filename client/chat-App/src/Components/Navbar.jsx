import { useContext } from "react";
import { Container, Nav , Navbar,Stack} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {

    const { user , logout } = useContext(AuthContext);

    return ( 
        <Navbar bg="dark">
            <Container>
            <Nav className="mr-auto">
            <h2>
                <Link to="/" className="link-light text-decoration-none">ChatApp</Link>
            </h2>
            </Nav>
            <Stack direction="horizontal" gap={3}>
            {user && (
                <>
                <Link onClick={()=>logout()} to='/login' className="link-light text-decoration-none"> Logout
                </Link>
                </>
            )}
            {!user && (
                <>
                 <Link to='/login' className="link-light text-decoration-none"> Login
                </Link>
                <Link to='/register' className="link-light text-decoration-none"> Register
                </Link>
                </>
            )}
            </Stack>
            </Container>
        </Navbar>
     );
}
 
export default NavBar;