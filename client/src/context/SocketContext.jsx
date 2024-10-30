import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo, selectedChatData, selectedChatType, addMessage } = useAppStore();


    useEffect(() => {

        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleReceiveMessage = (message) => {
                // Ensure selectedChatData and selectedChatType are defined
                if (!selectedChatData) {
                    console.error("Error: No selectedChatData available.");
                    return;
                }
                if (selectedChatType === undefined) {
                    console.error("Error: No selectedChatType defined.");
                    return;
                }

                console.log("Checking message:", message);
                console.log("Selected chat type:", selectedChatType);
                console.log("Selected chat data ID:", selectedChatData._id);

                // Check if message sender or recipient matches selectedChatData
                const isSenderMatch = message.sender && selectedChatData._id === message.sender._id;
                const isRecipientMatch = message.recipient && selectedChatData._id === message.recipient._id;

                if (isSenderMatch || isRecipientMatch) {
                    console.log("Conditions met for message processing");
                    addMessage(message); // Add message to state
                    console.log("Message received:", message);
                    console.log("Current selected chat data:", selectedChatData);
                } else {
                    console.log("Conditions not met; message not processed");
                }
            };

            // Set up the event listener for incoming messages
            socket.current.on("receiveMessage", (message) => {
                handleReceiveMessage(message);
            });


            return () => {
                socket.current.disconnect();
            };
        }
    }, [userInfo, selectedChatData, selectedChatType]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
