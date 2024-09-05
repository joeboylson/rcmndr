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
  background-color: rgba(255, 255, 255, 0.3);
  text-align: center;
  text-decoration: none;
  border: 1px solid white;
  color: white;
  padding: 12px 32px;
  border-radius: 50px;
  z-index: +1;
  font-size: 24px;
`;

const VideoWrapper = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  opacity: 0.5;
  filter: hue-rotate(110deg);
  margin: 0 auto;

  display: grid;
  place-items: center;
  justify-content: center;
`;

const Logo = styled("img")`
  display: block;
  position: fixed;
  top: 24px;
  left: 24px;
  width: 48px;
  background-color: black;
  padding: 8px;
  z-index: +1;
  border-radius: 48px;
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
      <Logo src="logo.png" />
      <LoginLink href={authenticationUrl}>Login with Spotify</LoginLink>
      <VideoWrapper>
        <video autoPlay muted loop>
          <source src="login-backround-video.webm" type="video/webm" />
        </video>
      </VideoWrapper>
    </StyledLogin>
  );
}
