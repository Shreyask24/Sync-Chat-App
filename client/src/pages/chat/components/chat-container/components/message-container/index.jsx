import React, { useEffect, useRef } from "react";
import moment from "moment";
import { useAppStore } from "@/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatMessages, userInfo } = useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      // ✅ Unified condition for AI and Contact
      let isUserMessage = false;

      if (selectedChatType === "contact") {
        // Check based on real sender
        isUserMessage = message.sender === userInfo.id;
      } else if (selectedChatType === "ai") {
        // AI messages alternate → even index = user, odd = AI
        isUserMessage = index % 2 === 0;
      }

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          {renderDMMessages(message, isUserMessage)}
        </div>
      );
    });
  };

  const renderDMMessages = (message, isUserMessage) => (
    <div className={`${isUserMessage ? "text-right" : "text-left"}`}>
      {(message?.messageType === "text" || typeof message === "string") && (
        <div
          className={`border inline-block p-4 rounded my-1 max-w-[70%] break-words
                ${
                  isUserMessage
                    ? "bg-[#8417ff]/5 text-white border-[#8417ff]/50"
                    : "bg-[#202b33]/5 text-white/90 border-[#ffffff]/20 w-fit"
                }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ node, ...props }) => (
                <p className="mb-2 leading-relaxed text-gray-200" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-white" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-gray-300" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside space-y-1 text-gray-200"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="ml-4" {...props} />,
            }}
          >
            {typeof message === "string" ? message : message.content}
          </ReactMarkdown>
        </div>
      )}

      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
