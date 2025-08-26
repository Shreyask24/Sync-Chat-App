import ChatHeader from "./components/chat-header";
import MessageBar from "./components/message-bar";
import MessageContainer from "./components/message-container";

const ChatContainer = ({ chatWithAI }) => {
  return (
    <div className="fixed top-0 h-[100vh] w-[80vw] bg-[#1c1d25] flex flex-col md:static md:flex-1">
      <ChatHeader chatWithAI={chatWithAI} />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
