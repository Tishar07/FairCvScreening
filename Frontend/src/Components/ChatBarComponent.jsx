import { useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
    Paperclip,
    ArrowUp,
    X,
    Briefcase,
    ChevronDown,
    Check,
    ExclamationCircle
} from "react-bootstrap-icons";

import { useJobs } from "../Hooks/useJobs";
import "../Style/ChatBarComponent.css";

const DEFAULT_JOBS = [
    { id: 3, title: "HR Generalist & Talent Specialist", department: "Human Resources" }
];

function ChatBarComponent({
    onSend,
    loading = false,
    selectedJob: propSelectedJob,
    onSelectJob,
    placeholder
}) {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [uncontrolledJob, setUncontrolledJob] = useState(null);
    const [jobError, setJobError] = useState(false);

    const fileInputRef = useRef(null);

    const {
        data: fetchedJobs = [],
        isLoading: jobsLoading,
        isError: jobsError
    } = useJobs();

    const availableJobs =
        fetchedJobs.length > 0
            ? fetchedJobs
            : DEFAULT_JOBS;

    const selectedJob =
        propSelectedJob !== undefined
            ? propSelectedJob
            : uncontrolledJob;

    const handleJobSelect = (job) => {
        setUncontrolledJob(job);
        setJobError(false);

        if (onSelectJob) {
            onSelectJob(job);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const removeFile = () => {
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedJob) {
            setJobError(true);
            return;
        }

        if (!message.trim() && !file) {
            return;
        }

        setJobError(false);

        onSend({
            message: message.trim(),
            file: file,
            jobId: selectedJob?.id ?? selectedJob,
            job: selectedJob
        });

        setMessage("");
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const isSubmitDisabled =
        loading ||
        !selectedJob ||
        (!message.trim() && !file);

    const submitTitle = !selectedJob
        ? "Please select a job first"
        : (!message.trim() && !file)
        ? "Type a message or attach a file"
        : "Send message";

    const inputPlaceholder = placeholder
        ? placeholder
        : selectedJob
        ? `Ask anything about ${selectedJob.title || selectedJob}...`
        : "Select a job to start chatting...";

    return (
        <div className="chat-bar-wrapper">

            {jobsError && (
                <div
                    role="alert"
                    className="job-error-alert"
                >
                    <ExclamationCircle size={15} />
                    <span>
                        Failed to load jobs. Using default jobs.
                    </span>
                </div>
            )}

            {jobError && (
                <div
                    id="job-error-msg"
                    role="alert"
                    className="job-error-alert"
                >
                    <ExclamationCircle size={15} />
                    <span>
                        Please select a job before sending your message.
                    </span>
                </div>
            )}

            {file && (
                <div className="selected-file">
                    <Paperclip size={16} />

                    <span className="selected-file-name">
                        {file.name}
                    </span>

                    <button
                        type="button"
                        className="remove-file-button"
                        onClick={removeFile}
                        title="Remove file"
                        aria-label="Remove file"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <form
                className={`chat-bar ${jobError ? "chat-bar-error" : ""}`}
                onSubmit={handleSubmit}
            >

                {/* Upload */}
                <button
                    type="button"
                    className="chat-bar-button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    title="Upload file"
                    aria-label="Upload file"
                >
                    <Paperclip size={20} />
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.png,.jpg,.jpeg"
                />

                {/* Job Selection */}
                <Dropdown
                    className="job-select-dropdown"
                    align="start"
                >
                    <Dropdown.Toggle
                        as="button"
                        type="button"
                        id="job-select-dropdown-btn"
                        className={`job-dropdown-toggle ${
                            selectedJob ? "has-job" : "no-job"
                        } ${jobError ? "job-error" : ""}`}
                        disabled={loading || jobsLoading}
                        title={
                            selectedJob
                                ? `Selected Job: ${
                                      selectedJob.title || selectedJob
                                  }`
                                : "Select a job"
                        }
                        aria-label="Select job opening"
                        aria-invalid={jobError ? "true" : "false"}
                        aria-errormessage={
                            jobError ? "job-error-msg" : undefined
                        }
                    >
                        <Briefcase
                            size={15}
                            className="job-toggle-icon"
                        />

                        <span className="job-toggle-label">
                            {jobsLoading
                                ? "Loading Jobs..."
                                : selectedJob
                                ? selectedJob.title || selectedJob
                                : "Select Job"}
                        </span>

                        <ChevronDown
                            size={11}
                            className="job-chevron-icon"
                        />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-dark job-dropdown-menu shadow-lg">

                        <Dropdown.Header className="job-menu-header">
                            Select Job Opening
                        </Dropdown.Header>

                        {selectedJob && (
                            <>
                                <Dropdown.Item
                                    as="button"
                                    type="button"
                                    onClick={() => handleJobSelect(null)}
                                    className="job-menu-item job-clear-item"
                                >
                                    <X size={16} />
                                    <span>
                                        Clear job selection
                                    </span>
                                </Dropdown.Item>

                                <Dropdown.Divider className="job-menu-divider" />
                            </>
                        )}

                        {availableJobs.map((job) => {
                            const jobId = job.id ?? job;
                            const jobTitle = job.title ?? job;

                            const isSelected =
                                selectedJob &&
                                (
                                    selectedJob.id === jobId ||
                                    selectedJob === jobId ||
                                    selectedJob.title === jobTitle
                                );

                            return (
                                <Dropdown.Item
                                    as="button"
                                    type="button"
                                    key={jobId}
                                    onClick={() => handleJobSelect(job)}
                                    className={`job-menu-item ${
                                        isSelected ? "active" : ""
                                    }`}
                                >
                                    <div className="job-item-content">
                                        <span className="job-item-title">
                                            {jobTitle}
                                        </span>

                                        {job.department && (
                                            <span className="job-item-dept">
                                                {job.department}
                                            </span>
                                        )}
                                    </div>

                                    {isSelected && (
                                        <Check
                                            size={16}
                                            className="job-item-check"
                                        />
                                    )}
                                </Dropdown.Item>
                            );
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                {/* Message */}
                <input
                    type="text"
                    className="chat-input"
                    placeholder={inputPlaceholder}
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);

                        if (jobError && selectedJob) {
                            setJobError(false);
                        }
                    }}
                    disabled={loading}
                />

                {/* Send */}
                <button
                    type="submit"
                    className="send-button"
                    disabled={isSubmitDisabled}
                    title={submitTitle}
                    aria-label="Send message"
                >
                    <ArrowUp size={20} />
                </button>
            </form>
        </div>
    );
}

export default ChatBarComponent;