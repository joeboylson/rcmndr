import Header from "../Header";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { IsAuthenticated } from "@shared/types";

interface UserContextType {
  authenticatedUser?: IsAuthenticated;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
});

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { authenticatedUser, loading } = useAuthenticatedUser();

  if (loading) return <p>Loading...</p>;

  return (
    <UserContext.Provider value={{ authenticatedUser }}>
      <Header />
      {children}
    </UserContext.Provider>
  );
}
