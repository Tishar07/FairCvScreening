import { useMutation } from "@tanstack/react-query";
import { sendChatMessage } from "../Api/ChatApi";

export const useSendChatMessage = () => {

    return useMutation({
        mutationFn: sendChatMessage
    });

};