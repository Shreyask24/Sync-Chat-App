import React, { useEffect } from 'react'
import ChatContainer from '../chat-container';

const ChatWithAI = () => {
    return (
        <div className="flex h-[100vh] text-white overflow-hidden">
            {<ChatContainer chatWithAI={true} />}

        </div>
    )
}

export default ChatWithAI