import { Card, Row, Col } from "react-bootstrap";

const overviewData = [
    {
        title: "Total Applicants",
        value: 120,
        percentage: "30.5%",
        color: "#0d6efd"
    },
    {
        title: "Active Job Openings",
        value: 12,
        percentage: "30.5%",
        color: "#00c853"
    },
    {
        title: "Shortlisted",
        value: 23,
        percentage: "30.5%",
        color: "#ffc107"
    },
    {
        title: "Average Match Score",
        value: 85,
        percentage: "30.5%",
        color: "#a855f7"
    }
];

function OverviewCard({ title, value, percentage, color }) {
    return (
        <Card
            className="h-100"
            style={{
                background: "linear-gradient(145deg, #1c1c1c, #292929)",
                border: "1px solid #3a3a3a",
                borderLeft: `4px solid ${color}`,
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                color: "white",
                overflow: "hidden"
            }}
        >
            <Card.Header
                style={{
                    background: "transparent",
                    borderBottom: "1px solid #3a3a3a",
                    color: color,
                    padding: "18px 20px"
                }}
                className="fs-5 fw-semibold"
            >
                {title}
            </Card.Header>

            <Card.Body style={{ padding: "24px 20px" }}>
                <Card.Title
                    style={{
                        color: "#ffffff",
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        marginBottom: "8px"
                    }}
                >
                    {value}
                </Card.Title>

                <Card.Text
                    style={{
                        color: color,
                        fontSize: "0.95rem",
                        marginBottom: 0
                    }}
                >
                    <span style={{ marginRight: "6px" }}>↗</span>
                    <span className="fw-semibold">{percentage}</span>
                    <span style={{ color: "#a0a0a0", marginLeft: "6px" }}>
                        vs last month
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default function OverviewComponent() {
    return (
        <Row className="g-4">
            {overviewData.map((item) => (
                <Col key={item.title} xs={12} sm={6} lg={3}>
                    <OverviewCard {...item} />
                </Col>
            ))}
        </Row>
    );
}
