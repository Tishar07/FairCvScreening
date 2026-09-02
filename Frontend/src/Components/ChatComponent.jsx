import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import "../Style/chat.css"
const jobs = [
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
];

export default function ChatComponent() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [input, setInput] = useState("");
  const [pdf, setPdf] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I'm FairCV. Upload a CV or ask me to review an applicant.",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim() && !pdf) return;

    const newMessages = [...messages];

    if (input.trim()) {
      newMessages.push({
        sender: "user",
        text: input,
      });
    }

    if (pdf) {
      newMessages.push({
        sender: "user",
        text: `Uploaded CV: ${pdf.name}`,
      });
    }

    // Dummy AI reply
    newMessages.push({
      sender: "ai",
      text: `I'll analyze this for the "${selectedJob}" position.`,
    });

    setMessages(newMessages);
    setInput("");
    setPdf(null);
  };

  return (
    <Card className="shadow rounded-4 p-3" style={{ height: "90vh" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        
        <Form.Select
          style={{ width: "220px" }}
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          {jobs.map((job) => (
            <option key={job}>{job}</option>
          ))}
        </Form.Select>
      </div>

      {/* Chat Messages */}
      <div className="chat-area flex-grow-1 mb-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-3 ${
              msg.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`message ${
                msg.sender === "user"
                  ? "user-message"
                  : "ai-message"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-top pt-3">
        <Form.Control
          type="file"
          accept=".pdf"
          className="mb-2"
          onChange={(e) => setPdf(e.target.files[0])}
        />

        {pdf && (
          <small className="text-muted d-block mb-2">
            {pdf.name}
          </small>
        )}

        <div className="d-flex gap-2">
          <Form.Control
            placeholder="Message FairCV..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </Card>
  );
}