import api from "../API/axios";

export const createConversation = async (message) => {
  try {
    const res = await api.post("chat/createConversation",{message:message});
    return res.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

