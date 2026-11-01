import { Container, Card } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import NavbarComponent from "../Components/NavbarComponent";
import ThemisLogo from "../Assets/ThemisLogo.png";
import { useGoogleLogin } from "../Hooks/useGoogleLogin";

export default function AuthPage() {
  const { mutate: login } = useGoogleLogin();
  return (
    <div
      data-bs-theme="dark"
      className="auth-page min-vh-100 d-flex flex-column text-light"
    >
      <NavbarComponent />

      <Container className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <Card
          className="auth-card border-secondary shadow rounded-4 w-100 bg-body-tertiary"
          style={{ maxWidth: "440px" }}
        >
          <Card.Body className="p-4 p-md-5 text-center">
            <div className="d-inline-flex align-items-center justify-content-center mb-4">
              <img
                src={ThemisLogo}
                alt="ThemisCV logo"
                width={56}
                height={56}
              />
            </div>

            <h2 className="fw-bold mb-2">Welcome to ThemisCV</h2>

            <p className="text-body-secondary mb-4">
              Sign in to manage job applications and make fairer,
              more transparent recruitment decisions.
            </p>

            <div className="text-start mb-2">
              <label className="form-label fw-semibold">
                Sign in to your account
              </label>
            </div>

            <div className="d-flex justify-content-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  login(credentialResponse.credential);
                }}
                onError={() => {
                  console.error("Google login failed");
                }}
                theme="filled_black"
                size="large"
                shape="rectangular"
                text="signin_with"
                width="340"
              />

            </div>

            <div className="d-flex align-items-center gap-3 my-4">
              <hr className="flex-grow-1" />
              <span className="text-body-secondary small">
                SECURE ACCESS
              </span>
              <hr className="flex-grow-1" />
            </div>

            <p className="text-body-secondary small mb-0">
              <i className="bi bi-lock me-2"></i>
              Your account is protected by Google authentication.
            </p>
          </Card.Body>
        </Card>
      </Container>

      <footer className="text-center py-3 text-body-secondary small">
        © {new Date().getFullYear()} ThemisCV · Fairer recruitment through
        technology
      </footer>
    </div>
  );
}