import {Routes, Route,Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Chat from './Pages/Chat';
import NavBar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { ChatContextProvider } from './Context/ChatContext';
function App() {
 const { user } = useContext(AuthContext);
  return (
    <>
    <ChatContextProvider user={user}>
    <NavBar/>
      <Container>
          <Routes>
            <Route exact path="/login"  element={user ? <Chat/> : <Login/>} />
            <Route exact path="/register"  element={user ? <Chat/> : <Register/>} />
            <Route exact path="/"  element={user ? <Chat/> : <Login/>} />
            <Route path='*' element={<Navigate to={'/'}/>}/>
          </Routes>
      </Container>
      </ChatContextProvider>
    </>
  )
}

export default App
