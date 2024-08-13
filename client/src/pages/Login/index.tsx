import axios from "axios";
import MinimalButton from "../../components/MinimalButton";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

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
    <>
      <p>Login Page</p>
      <a href={authenticationUrl}>Login</a>
      <pre></pre>
    </>
  );
}
