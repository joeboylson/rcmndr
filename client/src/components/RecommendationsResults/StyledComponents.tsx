import styled from "styled-components";

export const StyledRecommendationsResults = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
`;

export const ReviewBlock = styled("div")`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  code::before {
    content: "→ ";
    margin-left: 24px;
  }
`;

export const SearchButton = styled("button")`
  padding: 16px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.1);
`;
