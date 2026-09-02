import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style/navbar.css"


function NavbarComponent() {
  return (
<Navbar
      expand="lg"
      className="shadow-lg py-3 modern-navbar"
      variant="dark"
      fixed="top"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/" className="fw-bold fs-4 d-flex align-items-center">
          <div className="logo-circle me-2">
            <i className="bi bi-file-earmark-person-fill"></i>
          </div>
          FairCV
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto gap-2">
            <Nav.Link href="#" className="nav-item-custom active">
              <i className="bi bi-grid me-2"></i>
              Dashboard
            </Nav.Link>

            <Nav.Link href="#" className="nav-item-custom">
              <i className="bi bi-file-earmark-text me-2"></i>
              Review CVs
            </Nav.Link>

            <NavDropdown
              title={
                <>
                  <i className="bi bi-briefcase me-2"></i>
                  Job Processing
                </>
              }
              id="job-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#">
                <i className="bi bi-plus-circle me-2"></i>
                Manage Job Openings
              </NavDropdown.Item>

              <NavDropdown.Item href="#">
                <i className="bi bi-people me-2"></i>
                Manage Applicants
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item href="#">
                <i className="bi bi-clock-history me-2"></i>
                View History
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">
            <div className="profile-avatar">
              <i className="bi bi-person-fill"></i>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;