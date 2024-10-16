import React, { useEffect, useRef, useState } from 'react'
import {BsSend} from 'react-icons/bs';
import {TiMessages} from 'react-icons/ti';
import useConversation from '../zustand/useConversation';
import useSendMessage from '../hooks/useSendMessage';
import useGetConversatons from '../hooks/useGetConversatons';
import useGetMessages from '../hooks/useGetMessages';
import MessageSkeleton from './MessageSkeletop';
import { useAuthContext } from '../context/AuthContext';
import { extractTime } from '../utils/extractTime';
import useListenMessages from '../hooks/useListenMessages';

export default function MessageContainer() {
    const {selectedConversation,setSelectedConversation} = useConversation();

    useEffect(()=>{
      // cleanup function (unmount)
      return ()=>setSelectedConversation(null);
    },[setSelectedConversation])
  return (
    <div className="md:min-w-[450px] flex flex-col">
       {!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
					</div>
					<Messages />
					<MessageInput />
				</>
		)}
    </div>
  )
}

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};


function Messages(){
  const {messages, loading} = useGetMessages();
  useListenMessages();
  const lastRef = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      lastRef.current?.scrollIntoView({behavior : "smooth"});
    },100)
  },[messages])
    return (
        <div className="px-4 flex-1 overflow-auto message-container">
            {
              !loading && messages.length>0 && messages.map((message)=>{
                  return <div key={message._id} ref={lastRef}>
                  <Message  message={message} />
                </div>
            })
            }
            {loading && [...Array(3)].map((_,ind)=> <MessageSkeleton key={ind} />)}
            {!loading && messages.length === 0 && (
              <p className="text-center">Send a message to start the conversations</p>
            )}
        </div>
    )
}

function Message({message}){
   const {authUser} =    useAuthContext();
   const {selectedConversation} = useConversation();
   const fromMe = message.senderId === authUser._id;
   const chatClassName = fromMe ? 'chat-end' : 'chat-start';
   const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
   const bubbleBgColor = fromMe ? 'bg-blue-500' : "";
   const formatTime = extractTime(message.createdAt);

   const shakeClass = message.shouldShake ? "shake" : ""
    return (
       <div className={`chat ${chatClassName}`}>
           <div className="chat-image avatar">
             <div className="w-10 rounded-full">
                <img src={profilePic} />
             </div>
           </div>
           <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
           <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{formatTime}</div>
       </div>
    )
}

const MessageInput = () => {
  const [message,setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!message) return;
    console.log(message);
    await sendMessage(message);
    setMessage("");
  }
    return (
    	<form className='px-4 my-3 relative' onSubmit={handleSubmit}>
    		<div className='w-full'>
    			<input
    				type='text'
    				className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
    				placeholder='Send a message'
            value={message}
            onChange={e=>setMessage(e.target.value)}
    			/>
    			<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-7'>
    				{loading ? <div className="loading loading-spinner"></div> : <BsSend className="text-white"/>}
    			</button>
    		</div>
    	</form>
    );
};