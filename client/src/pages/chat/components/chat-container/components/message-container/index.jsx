import React, { useEffect, useRef } from 'react'
import moment from 'moment'
import { useAppStore } from '@/store'
import ReactMarkdown from 'react-markdown';

const MessageContainer = () => {

    const scrollRef = useRef()
    const { selectedChatType, selectedChatMessages } = useAppStore()

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [selectedChatMessages])

    const renderMessages = () => {
        let lastDate = null;

        return selectedChatMessages.map((message, index) => {
            const messageDate = moment(message.timestamp).format("YYYY-MM-DD")
            const showDate = messageDate !== lastDate;  // Only show the message date once if 10 msgs are sent on 25th than 25th eill see once than all 10 msgs will be shown
            lastDate = messageDate

            const isUserMessage = index % 2 === 0;

            return (
                <div key={index}>
                    {showDate && (
                        <div className='text-center text-gray-500 my-2'>
                            {moment(message.timestamp).format("LL")}
                        </div>
                    )}
                    {
                        selectedChatType === "contact" && renderDMMessages(message, "") ||
                        selectedChatType === "ai" && renderDMMessages(message, isUserMessage)

                    }
                </div>
            )
        })
    }

    const renderDMMessages = (message, isUserMessage) => (
        <div className={`${isUserMessage ? "text-right" : "text-left"}`}>
            {(message?.messageType === "text" || typeof message === "string") && (
                <div className={`border inline-block p-4 rounded my-1 max-w-[50%] break-words
                ${isUserMessage
                        ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                        : "bg-[#202b33]/5 text-white/90 border-[#ffffff]/20"
                    }`}
                >
                    <ReactMarkdown>{typeof message === "string" ? message : message.content}</ReactMarkdown>
                </div>
            )}

            <div className="text-xs text-gray-600">
                {moment(message.timestamp).format("LT")}
            </div>
        </div>
    );


    return (
        <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
            {renderMessages()}
            <div ref={scrollRef} />
        </div>
    )
}

export default MessageContainer