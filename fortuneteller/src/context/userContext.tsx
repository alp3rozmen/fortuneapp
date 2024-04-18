import React from "react"
import { createContext } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null as any)

export const AuthContextProvider = ({ children }: any) => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLogin(true)
            setUserName(localStorage.getItem('userName'))
            setToken(token)
        }
    })


    const navigate = useNavigate()
    const [isLogin , setIsLogin] = useState(false)
    const [userId, setUserId] = useState(0)
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('')

    const login = (userName : String, password : String) => {
        
        fetch('http://localhost:3000/api/login', {method: 'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json', accessControlAllowOrigin: '*'}, 
            body: JSON.stringify({username: userName, password: password})}).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setToken(data.token)
                    setUserId(data.userid)
                    setIsLogin(true)
                    setUserName(data.userName)
                    navigate('/')
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('userid', data.userid)
                    localStorage.setItem('userName', data.userName)
                
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
        <AuthContext.Provider value={{token,userId, userName, isLogin, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}


export type AuthContextType = {
    isLogin: boolean,
    userName : string,
    login: (userName : String, password : String) => void,
    logout: () => void
}


export default AuthContext