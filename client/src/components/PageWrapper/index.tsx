import styled from "styled-components";
import { WithChildren } from "../../types";

const StyledPageWrapper = styled("div")`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 48px;

  * {
    color: white;
  }

  @media (max-width: 600px) {
    padding: 24px;
  }

  @media (max-width: 500px) {
    padding: 12px;
  }
`;

export default function PageWrapper({ children }: WithChildren) {
  return <StyledPageWrapper id="page-wrapper">{children}</StyledPageWrapper>;
}
