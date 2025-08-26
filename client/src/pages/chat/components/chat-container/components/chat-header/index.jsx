import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = ({ chatWithAI }) => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-18 h-12 relative">
            {!chatWithAI ? (
              <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {selectedChatData?.image ? (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData?.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={` uppercase h-12 w-12 text-lg border-[1px] flex justify-center items-center rounded-full ${getColor(
                      selectedChatData?.color
                    )}`}
                  >
                    {selectedChatData?.firstName
                      ? selectedChatData?.firstName?.split("")?.shift()
                      : selectedChatData?.email?.split("")?.shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white font-bold text-2xl shadow-md">
                  🤖
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Sync AI
                </span>
              </div>
            )}
          </div>

          <div>
            {selectedChatType === "contact" && selectedChatData?.firstName
              ? `${selectedChatData.firstName} ${selectedChatData?.lastName}`
              : selectedChatData?.email}
          </div>
        </div>

        <div className="flex gap-5 items-center justify-center">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
