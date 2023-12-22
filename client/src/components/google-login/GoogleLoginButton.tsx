import { IconButton } from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useGoogleAuthenticateUserMutation } from "../../services/authApi";
import { useAuthentication } from "../../hooks/useAuth";

export default function GoogleLoginButton() {
  const { authenticate } = useAuthentication(useGoogleAuthenticateUserMutation);
  const handleGoogleSubmit = (res: CredentialResponse) => {
    authenticate({
      token: res.credential,
    });
  };

  return (
    <IconButton>
      <GoogleLogin type="icon" onSuccess={handleGoogleSubmit} />
    </IconButton>
  );
}
