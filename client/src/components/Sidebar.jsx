import React, { useState } from 'react'
import {IoSearchSharp} from 'react-icons/io5';
import {BiLogOut} from 'react-icons/bi';
import useLogout from '../hooks/useLogout';
import useGetConversatons from '../hooks/useGetConversatons';
import { getRandomEmoji } from '../utils/emojis';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';

export default function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}


function SearchInput(){
      const [search,setSearch] = useState("");
      const {setSelectedConversation} = useConversation();
      const {conversations} = useGetConversatons();
       
      function handleSubmit(e){
        e.preventDefault();
        if(!search) return ;
        if(search.length < 3)
           return toast.error("Search term mmust be at least 3 characters long");
        
        const conversation = conversations.find(c=>c.fullName.toLowerCase().includes(search.toLowerCase()));

        if(conversation){
          setSelectedConversation(conversation);
          setSearch("");
        }else toast.error("No such user found!")
      }
      return (
        <form action="" className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input 
               type="text" 
               placeholder='Search...' 
               className="input input-bordered rounded-full"
               value ={search}
               onChange={e=>setSearch(e.target.value)}
              />
            <button type='submit' className="btn btn-circle bg-sky-500 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
      )
}

function Conversations(){
    const {loading, conversations} = useGetConversatons();
    return (
        <div className="py-2 flex flex-col overflow-auto">
            {conversations?.map((conversation,ind)=>{
              return <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIdx = {ind   === conversations.length-1}
                     ></Conversation>
            })}
        </div>
    )
}

function Conversation({conversation,emoji,lastIdx}){

    const {selectedConversation,setSelectedConversation} = useConversation();
    
    const isSelected = selectedConversation?._id === conversation?._id

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers?.includes(conversation._id)
    return (
        <>
          <div className={`flex gap-2 items-center hover:bg-sky-500 rounded py-2 px-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
               onClick={()=>setSelectedConversation(conversation)}
          >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img
                      src={conversation.profilePic}
                      alt="user avatar"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1 ">
                <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                        <span className="text-xl">{emoji}</span>
                </div>
            </div>
          </div>

          {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
        </>
    )
}

function LogoutButton(){
     const {loading,logout} = useLogout();
     return (
        <div className="mt-auto">
            {
              !loading ? (
                <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
              ) : (
                 <span className="loading loading-spinner"></span>
              )
            }
            
        </div>
     )
}