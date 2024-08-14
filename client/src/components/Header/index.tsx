import "./index.css";
import { useCallback, useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";
import { useNavigate } from "react-router-dom";
import MinimalButton from "../MinimalButton";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

export default function Header() {
  const { logout } = useAuthenticatedUser({ skipAuthenticatedUserQuery: true });
  const { authenticatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div id="components-header">
      <p>Header: {authenticatedUser?.user.display_name}</p>
      <MinimalButton onClick={handleLogout}>Logout</MinimalButton>
    </div>
  );
}
