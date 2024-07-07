
import React from "react"
import { createContext } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null as any)

export const AuthContextProvider = ({ children }: any) => {

    
       
    useEffect(() => {
        var token = localStorage.getItem('token')

        if ((token) && (userId > 0)) {
            setIsLogin(true)
            setUserName(localStorage.getItem('userName'))
            setToken(token)
        }
        else if ((token) && (userId === 0)) {
            getUserInfo()
        }
    })


    const navigate = useNavigate()
    const [isLogin , setIsLogin] = useState(false)
    const [userId, setUserId] = useState(0)
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [balance , setBalance] = useState(0)
    const [role , setRole] = useState('')

    const getUserInfo = () => {
            fetch('http://localhost:3000/api/getUserInfo', 
                {
                method: 'POST', 
                headers: {'authorization': `Bearer ${localStorage.getItem('token')}`,'Accept': 'application/json', 'Content-Type': 'application/json', accessControlAllowOrigin: '*'}, 
                body: JSON.stringify({userid : localStorage.getItem('userid')})}).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        setUserId(data.userid)
                        setIsLogin(true)
                        setUserName(data.userName)
                        setRole(data.user_role)
                        setEmail(data.email)
                        setBalance(data.balance)
                        localStorage.setItem('userid', data.userid)
                        localStorage.setItem('userName', data.userName)
                        localStorage.setItem('userType', data.user_role)
                        localStorage.setItem('profile_picture', data.profile_image)

                    })
                    
                }
                else {
                    response.json().then((data) => {
                        toast.error(data.error, {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: 'light',
                        })

                        localStorage.removeItem('userid');
                        localStorage.removeItem('userName')
                        localStorage.removeItem('userType')
                        localStorage.removeItem('profile_picture')
                        navigate('/')   
                    })
                }
            }).catch((error) => {
                toast.error('Bir hata oluştu', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                })
                localStorage.removeItem('userid');
                localStorage.removeItem('userName')
                localStorage.removeItem('userType')
                localStorage.removeItem('profile_picture')
                navigate('/') 
                console.log(error)
            })
    }

    const login = (userName : String, password : String) => {
        
        fetch('http://localhost:3000/api/login', {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', accessControlAllowOrigin: '*'}, 
            body: JSON.stringify({username: userName, password: password})}).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setToken(data.token)
                    setUserId(data.userid)
                    setIsLogin(true)
                    setUserName(data.userName)
                    setRole(data.user_role)
                    setEmail(data.email)
                    setBalance(data.balance)

                    console.log(data)
                    navigate('/')
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userid', data.userid)
                    localStorage.setItem('userName', data.userName)
                    localStorage.setItem('userType', data.user_role)
                    localStorage.setItem('profile_picture', data.profile_image)
                    toast.success(data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    })
                
                })
                
            }
            else {
                response.json().then((data) => {
                    toast.error(data.error, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    })
                    setIsLogin(false)
                })
            }
        }).catch((error) => {
            toast.error('Bir hata oluştu', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            })
            console.log(error)
            setIsLogin(false)
        })
        
    }

    const logout = () => {
        setIsLogin(false)
        navigate('/')
        localStorage.clear()
    }

    return (
        <AuthContext.Provider value={{token,userId, userName, isLogin, email , role, balance, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export type AuthContextType = {
    isLogin: boolean,
    userName : string,
    userType : string,
    email : string,
    balance : number,
    role : string,
    login: (userName : String, password : String) => void,
    logout: () => void
}


export default AuthContext