import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Dropdown, Modal, Spinner } from "react-bootstrap";
import { Pen, Trash } from "react-bootstrap-icons";

// Mock API function to simulate paginated chat history
const fetchRecentChatsApi = async (page, limit = 8) => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network delay

  const maxPages = 4;
  if (page > maxPages) return { data: [], hasMore: false };

  const sampleTitles = [
    "React-Bootstrap Typography Guide",
    "Tailwind vs Bootstrap Comparison",
    "Node.js Stream Pipeline Setup",
    "Redux Toolkit Query Mutation Hook",
    "Infinite Scroll Observer Implementation",
    "WebSocket Real-Time Notifications",
    "Authentication Flow with JWT",
    "Optimizing Database Queries",
  ];

  const data = Array.from({ length: limit }, (_, index) => {
    const id = (page - 1) * limit + index + 1;
    const title = sampleTitles[(id - 1) % sampleTitles.length];
    return { id, title: `${title} #${id}` };
  });

  return { data, hasMore: page < maxPages };
};

function ChatSideBarComponent() {
  // Infinite scroll & list states
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Deletion modal states
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Observer sentinel reference
  const observerRef = useRef(null);


  // Fetch paginated data
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetchRecentChatsApi(page);
      setItems((prev) => [...prev, ...response.data]);
      setHasMore(response.hasMore);
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    loadMoreItems();
  }, [page]);

  // Setup IntersectionObserver for infinite scrolling
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1, rootMargin: "60px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // Deletion handlers
  const handleOpenDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setItems((prev) => prev.filter((i) => i.id !== itemToDelete.id));
    }
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleNewChat= () =>{
    window.location.reload();
  }

  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
        <div className="container px-0">
          <Button
            variant="outline-light"
            className="w-100 d-flex align-items-center justify-content-center gap-2 rounded-pill py-2"
            onClick={handleNewChat}
          >
            <Pen />
            <span>New Chat</span>
          </Button>
        </div>
      </div>

      <div className="container-fluid d-flex flex-column justify-content-start align-items-start mt-4">
        <p className="fs-5 fw-bold mb-3">Recent</p>

        {/* Scrollable container for pill items */}
        <div
          className="w-100 pe-1"
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-between px-3 py-2 rounded-pill mb-2"
              style={{
                backgroundColor: "#212529",
                color: "#ffffff",
                transition: "background-color 0.2s ease",
              }}
            >
              <span
                className="fw-medium text-truncate me-2 small"
                title={item.title}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </span>

              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  className="btn btn-link text-white p-0 border-0 shadow-none d-flex align-items-center"
                  style={{ textDecoration: "none" }}
                  title="Chat options"
                >
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="dropdown-menu-dark border-0 shadow-lg py-1 px-1 rounded-3"
                  style={{ backgroundColor: "#2b2b2b" }}
                >
                  <Dropdown.Item
                    onClick={() => handleOpenDelete(item)}
                    className="d-flex align-items-center gap-2 text-danger-emphasis py-1 px-2 rounded-2"
                  >
                    <Trash size={14} className="text-white" />
                    <span className="text-white small">Delete</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}


          <div ref={observerRef} className="py-2 text-center w-100">
            {loading && (
              <div className="d-flex justify-content-center align-items-center gap-2 text-secondary py-2">
                <Spinner animation="border" size="sm" variant="light" />
                <span className="small">Loading more...</span>
              </div>
            )}
            {!hasMore && items.length > 0 && (
              <p className="text-secondary small fst-italic my-2">
                No more chats
              </p>
            )}
            {!loading && items.length === 0 && (
              <p className="text-secondary small fst-italic">No recent chats</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        contentClassName="bg-dark text-white border-secondary rounded-4 shadow"
      >
        <Modal.Header closeButton closeVariant="white" className="border-secondary">
          <Modal.Title className="fs-6 fw-bold">Delete Chat?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="small text-secondary">
          Are you sure you want to delete{" "}
          <strong className="text-white">"{itemToDelete?.title}"</strong>? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer className="border-secondary pt-2 pb-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowModal(false)}
            className="rounded-pill px-3"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleConfirmDelete}
            className="rounded-pill px-3"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChatSideBarComponent;