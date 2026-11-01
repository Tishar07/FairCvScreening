import { useState } from "react";
import {
    Button,
    Collapse,
    Tooltip,
    OverlayTrigger
} from "react-bootstrap";
import {
    CaretRight,
    CaretLeft
} from "react-bootstrap-icons";

import NavbarComponent from "../Components/NavbarComponent";
import ChatSideBarComponent from "../Components/ChatSideBarComponent";
import ChatComponent from "../Components/ChatComponent";

import "../Style/sidebarChat.css";

function ReviewCVPage() {
    const [open, setOpen] = useState(true);

    return (
        <div className="review-cv-page">
            {/* Navbar */}
            <div className="review-navbar">
                <NavbarComponent />
            </div>

            {/* Everything below navbar */}
            <div className="review-cv-content">
                {/* Sidebar */}
                <div className="chat-sidebar-section">
                    <div
                        className="sidebar-toggle"
                        style={{ justifyContent: open ? "flex-end" : "center" }}
                    >
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-chatSide">
                                    {open ? "Collapse Sidebar" : "Expand Sidebar"}
                                </Tooltip>
                            }
                        >
                            <Button
                                variant="outline-secondary"
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                className="sidebar-toggle-button d-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "36px", padding: 0 }}
                            >
                                {open ? <CaretLeft size={18} /> : <CaretRight size={18} />}
                            </Button>
                        </OverlayTrigger>
                    </div>

                    <Collapse in={open} dimension="width">
                        <div id="chat-sidebar">
                            <div className="chat-sidebar-container">
                                <ChatSideBarComponent />
                            </div>
                        </div>
                    </Collapse>
                </div>

                {/* Chat */}
                <div className="chat-container">
                    <ChatComponent />
                </div>
            </div>
        </div>
    );
}

export default ReviewCVPage;

