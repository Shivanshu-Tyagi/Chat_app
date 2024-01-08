import  { createContext, useCallback, useState , useEffect } from 'react';
import { postRequest, baseUrl } from '../Utils/Service';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setisRegisterLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setisLoginLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);
console.log("user+++++++" ,user);
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateloginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setisRegisterLoading(true);
    setRegisterError(null);

    try {
      const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));

      setisRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      } 
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response)
      
    } catch (error) {
      setRegisterError({ error: true, message: error.message || "An error occurred during registration" });
    }
  }, [registerInfo]);

  const loginUser = useCallback(async (e) => {
    
    e.preventDefault();
    setisLoginLoading(true);
    // setLoginError(null);
    console.log("LOGIN INFO"+JSON.stringify(loginInfo, null, 2)) ; 
    console.log("SET"+setLoginInfo);
  
    try {
      const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
      console.log("+--+-+-++",response);
  
      setisLoginLoading(false);
  
      if (response.error) {
        return setLoginError(response);
      }
  
      // If successful login, store user in localStorage and update state
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    } catch (error) {
      setLoginError({ error: true, message: error.message || "An error occurred during login" });
    }
  }, [loginInfo]);
  

  const logout = useCallback(() => {
    localStorage.removeItem('User');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      registerInfo,
      updateRegisterInfo,
      registerUser,
      registerError,
      isRegisterLoading,
      logout,
      loginUser,
      updateloginInfo,
      loginInfo,
      loginError,
      isLoginLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};