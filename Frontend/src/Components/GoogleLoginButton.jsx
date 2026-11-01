import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "../Hooks/useGoogleLogin";

export default function GoogleLoginButton({ onLoginSuccess }) {
  const googleMutation = useGoogleLogin();

  const handleSuccess = (credentialResponse) => {
    googleMutation.mutate(credentialResponse.credential);

    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />

      {googleMutation.isPending && <p>Signing in...</p>}
    </>
  );
}