import { useCallback, useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";
import { useNavigate } from "react-router-dom";
import MinimalButton from "../MinimalButton";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import styled from "styled-components";
import { SignOut } from "@phosphor-icons/react";

const StyledHeader = styled("div")`
  background-color: rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: 1fr 24px;
  align-items: center;
  padding: 0 48px;

  * {
    color: white;
  }

  > button {
    width: 18px;
    height: 18px;
  }
`;

export default function Header() {
  const { logout } = useAuthenticatedUser({ skipAuthenticatedUserQuery: true });
  const { authenticatedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <StyledHeader>
      <code>RCMNDR | Hey there, {authenticatedUser?.user.display_name}</code>
      <MinimalButton onClick={handleLogout}>
        <SignOut size={18} />
      </MinimalButton>
    </StyledHeader>
  );
}
