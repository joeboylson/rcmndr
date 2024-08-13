import axios from "axios";
import { IsAuthenticated } from "@shared/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface _options {
  skipAuthenticatedUserQuery: boolean;
}

export function useAuthenticatedUser(options?: _options) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [authenticationUrl, setAuthenticationUrl] = useState<string>();
  const [authenticatedUser, setAuthenticatedUser] = useState<IsAuthenticated>();

  const getIsAuthenticated = useCallback(async () => {
    if (authenticatedUser) return;
    setLoading(true);

    try {
      const response = await axios.get(`/api/auth/is-authenticated`);
      const _authenticatedUser = response.data as unknown as IsAuthenticated;
      if (!_authenticatedUser?.authenticated) throw new Error("Invalid user");
      setAuthenticatedUser(_authenticatedUser);
    } catch (error) {
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate, authenticatedUser]);

  const getAuthenticationUrl = useCallback(async () => {
    if (authenticationUrl) return;

    try {
      const response = await axios.get(`/api/auth/get-spotify-auth-url`);
      setAuthenticationUrl(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [authenticationUrl]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/auth/logout`);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [authenticationUrl]);

  useEffect(() => {
    if (!options?.skipAuthenticatedUserQuery) getIsAuthenticated();
  }, [getIsAuthenticated]);

  const exportFunctions = {
    getAuthenticationUrl,
    logout,
  };

  const exportValues = {
    loading,
    authenticatedUser,
    authenticationUrl,
  };

  return { ...exportFunctions, ...exportValues };
}
