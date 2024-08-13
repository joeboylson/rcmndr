import AuthenticatedWrapper from "../../components/AuthenticatedWrapper";

export default function Home() {
  return (
    <AuthenticatedWrapper>
      <p>Home Page</p>
    </AuthenticatedWrapper>
  );
}
