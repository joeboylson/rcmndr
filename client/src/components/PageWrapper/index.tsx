import styled from "styled-components";
import { WithChildren } from "../../types";

const StyledPageWrapper = styled("div")`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 48px;

  * {
    color: white;
  }
`;

export default function PageWrapper({ children }: WithChildren) {
  return <StyledPageWrapper>{children}</StyledPageWrapper>;
}
