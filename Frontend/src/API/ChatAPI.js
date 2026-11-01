import axios from "axios";
import {getCurrentUser} from "../Services/authServices"
import { createConversation } from "../Services/conversationService";
export const sendChatMessage = async ({
    message,
    file,
    currentLogUserId,
    jobId,
    job,
    sessionId,
}) => {
    const formData = new FormData();
    currentUser = getCurrentUser();
    currentLogUserId = currentUser.id;

    newConvo = localStorage.getItem("newConvo");
    sessionId = localStorage.getItem("session_id");

    if (newConvo == true){
        convosationResponse = createConversation(message);
        sessionId = localStorage.setItem("session_id",convosationResponse.id);
        newConvo = false;
    }

    formData.append("message", message);
    if (currentLogUserId) {
        formData.append("current_log_user_id", currentLogUserId);
    }
    if (jobId) {
        formData.append("job_id", jobId);
    }
    if (sessionId) {
        formData.append("session_id", sessionId);
    }
    if (file) {
        formData.append("file", file);
    }

    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat/send`,
        formData
    );

    return response.data;
};