import AuthenticatedWrapper from "../../components/AuthenticatedWrapper";
import MinMaxInput from "../../components/MinMaxInput";
import PropertyInputWrapper from "../../components/PropertyInputWrapper";
import TrackSelectInput from "../../components/TrackSelectInput";

export default function Home() {
  return (
    <AuthenticatedWrapper>
      <TrackSelectInput />
      <div style={{ padding: "24px" }}>
        <MinMaxInput />
      </div>

      <div
        style={{
          padding: "100px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)",
          gap: "24px",
          width: "600px",
        }}
      >
        <PropertyInputWrapper />
        <PropertyInputWrapper />
        <PropertyInputWrapper />
        <PropertyInputWrapper />
        <PropertyInputWrapper />
        <PropertyInputWrapper />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </AuthenticatedWrapper>
  );
}
