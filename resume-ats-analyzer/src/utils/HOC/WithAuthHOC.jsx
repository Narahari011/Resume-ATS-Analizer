import React from "react"
import { useEffect , useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../AuthContext"

const WithAuthHOC = (WrappedComponent) => { 

    const AuthenticatedComponent = (props) => {
        const navigate = useNavigate();
        const {setLogin} = useContext(AuthContext)
        
  
        useEffect(() => {
            const isLogin = localStorage.getItem('isLogin');

            if (!isLogin) {
                setLogin(false)
                navigate('/')
                return;
            }
        }, [navigate, setLogin]);

        return React.createElement(WrappedComponent, props);  
    }

    return AuthenticatedComponent;
}

export default WithAuthHOC;
