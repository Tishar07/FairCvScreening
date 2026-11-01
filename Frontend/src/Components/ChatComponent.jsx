import { useEffect, useRef, useState } from "react";
import { Briefcase } from "react-bootstrap-icons";
import { useSendChatMessage } from "../Hooks/useChat";

import ChatBarComponent from "./ChatBarComponent";
import "../Style/ChatComponent.css";


function ChatComponent({ currentLogUserId ,newConversation=false}) {

    const [messages, setMessages] = useState([]);

    const messagesContainerRef = useRef(null);

    const shouldAutoScroll = useRef(true);

    const { mutateAsync: sendChat, isPending } = useSendChatMessage();

    const handleScroll = () => {
        const container = messagesContainerRef.current;
        if (!container) {
            return;
        }
        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        shouldAutoScroll.current = distanceFromBottom < 100;
    };


    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) {
            return;
        }
        if (shouldAutoScroll.current) {

            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);


    const handleSend = async ({ message, file, jobId, job }) => {
        const userMessage = {
            id: Date.now(),
            role: "user",
            content: message,
            fileName: file ? file.name : null,
            jobTitle: job?.title || (typeof job === "string" ? job : null)
        };

        setMessages((previous) => [
            ...previous,
            userMessage
        ]);

        shouldAutoScroll.current = true;
        try {

            const data = await sendChat({
                message,
                file,
                currentLogUserId,
                jobId: jobId || job?.id,
                job
            });

            const contentText = Array.isArray(data) 
                ? data[0]?.output 
                : (data?.output || data?.message);

            const aiMessage = {
                id: Date.now() + 1,
                role: "ai",
                content: contentText || "Received response."
            };

            setMessages((previous) => [
                ...previous,
                aiMessage
            ]);

        } catch (error) {

            console.error(
                "Chat API error:",
                error.response?.data || error.message
            );

            const errorMessage = {
                id: Date.now() + 1,
                role: "ai",
                content:
                    "Sorry, something went wrong while processing your request."
            };

            setMessages((previous) => [
                ...previous,
                errorMessage
            ]);
        }
    };


    return (
        <div className="chat-panel">

            <div ref={messagesContainerRef} className="chat-messages" onScroll={handleScroll}>
                {messages.length === 0 && !isPending && (
                    <div className="chat-empty-state">
                        <div className="empty-state-title">Welcome to ThemisCV</div>
                        <div className="empty-state-subtitle">
                            Ask questions about applicants, analyze CVs, or upload candidate documents to get started.
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-row ${message.role}`}
                    >
                        {message.role === "user" ? (
                            <div className="user-message">
                                {message.jobTitle && (
                                    <div className="user-job-tag">
                                        <Briefcase size={12} />
                                        <span>{message.jobTitle}</span>
                                    </div>
                                )}
                                <div>
                                    {message.content}
                                </div>
                                {message.fileName && (
                                    <div className="user-file">
                                        {message.fileName}
                                    </div>
                                )}
                            </div>

                        ) : (
                            <div className="ai-message">
                                {message.content}
                            </div>
                        )}
                    </div>
                ))}

                {isPending && (
                    <div className="message-row ai">

                        <div className="ai-message loading-message">
                            <span>Thinking...</span>
                        </div>

                    </div>
                )}

            </div>
            
            <div className="chat-input-container">
                <ChatBarComponent
                    onSend={handleSend}
                    loading={isPending}
                />
            </div>
            
        </div>
    );
}

export default ChatComponent;