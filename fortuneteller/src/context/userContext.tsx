import React from "react"
import { createContext } from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext(null as any)

export const AuthContextProvider = ({ children }: any) => {

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            setIsLogin(true)
            setUserName(sessionStorage.getItem('userName'))
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
                    sessionStorage.setItem('token', data.token)
                    sessionStorage.setItem('userid', data.userid)
                    sessionStorage.setItem('userName', data.userName)
                })
            }
            else {
                setIsLogin(false)
            }
        }).catch((error) => {
            console.log(error)
            setIsLogin(false)
        })
        
    }

    const logout = () => {
        setIsLogin(false)
        navigate('/')
        sessionStorage.clear()
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