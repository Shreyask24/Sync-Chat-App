import { useSocket } from "@/context/SocketContext";
import { useAppStore } from "@/store";
import { GoogleGenAI } from "@google/genai";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setSelectedChatMessages,
    addMessage,
  } = useAppStore();

  const GEMINI_API = import.meta.env.VITE_GEMINI_API_KEY;

  const genAI = new GoogleGenAI({
    apiKey: GEMINI_API,
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });

      // Clear input field
      setMessage("");
    }

    if (selectedChatType === "ai") {
      const userMessage = message;

      // Add user message first
      addMessage({
        content: userMessage,
        sender: userInfo.id,
        messageType: "text",
        timestamp: new Date().toISOString(),
      });

      // Clear input field
      setMessage("");

      const result = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
      });

      const aiReply = result?.text || "Something went wrong";
      const formattedAiReply = aiReply
        .replace(/\\"/g, '"')
        .replace(/\\n/g, "\n");

      // Add AI response
      addMessage({
        content: formattedAiReply,
        sender: "ai",
        messageType: "text",
        timestamp: new Date().toISOString(),
      });
    }
  };
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              // prevent shift+enter from sending
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />

        {/* <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all'>
                    <GrAttachment className="text-2xl" />
                </button> */}

        <div className="realtive">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
