import styled from "styled-components";
import MoviesPage from "./components/MoviesPage";


export default function App() {
  return (
    <StyledApp>
      <MoviesPage />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  width: 375px;
  height: 810px;
`



