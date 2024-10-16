import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

 
 export const SocketContext = createContext();

 export const useSocketContext = ()=>{
    return useContext(SocketContext)
 }
 export const SocketContextProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] =  useState(null);
    const {authUser}  = useAuthContext();

    useEffect(()=>{
        if(authUser){
            console.log("authuser :",authUser._id);
            //https://chat-ou2n.onrender.com/
            const socket = io('https://chat-app-git-main-yesu-rajus-projects.vercel.app',{
                query : {
                    userId : authUser._id,
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                console.log("users : ",users);
                setOnlineUsers(users);
            })
            return ()=>socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
 }
