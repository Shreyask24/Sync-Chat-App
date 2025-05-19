export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),

    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] }),

    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        const sender =
            selectedChatType === "ai"
                ? "ai"
                : selectedChatType === "channel"
                    ? message.sender
                    : message.sender._id;

        const recipient =
            selectedChatType === "channel"
                ? message.recipient
                : message.recipient?._id;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    sender,
                    recipient
                }
            ]
        });
    }

})