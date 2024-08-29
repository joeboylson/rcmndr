import { useEffect } from "react";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import styled from "styled-components";

const StyledLogin = styled("div")`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginLink = styled("a")`
  display: block;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  text-decoration: none;
  border: 1px solid white;
  color: white;
  padding: 8px 24px;
  border-radius: 50px;
`;

export default function Login() {
  const { getAuthenticationUrl, authenticationUrl, loading } =
    useAuthenticatedUser({
      skipAuthenticatedUserQuery: true,
    });

  useEffect(() => {
    if (!authenticationUrl) getAuthenticationUrl();
  });

  if (loading) return <p>loading</p>;

  return (
    <StyledLogin>
      <LoginLink href={authenticationUrl}>Login with Spotify</LoginLink>
    </StyledLogin>
  );
}
