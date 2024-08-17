import AuthenticatedWrapper from "../../components/AuthenticatedWrapper";
import PageWrapper from "../../components/PageWrapper";
import PropertiesForm from "../../components/PropertiesForm";

export default function Home() {
  return (
    <AuthenticatedWrapper>
      <PageWrapper>
        <PropertiesForm />
      </PageWrapper>
    </AuthenticatedWrapper>
  );
}
